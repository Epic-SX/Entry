import db from '../database/mysql2-utils.js';

/**
 * @returns {Promise<boolean>}
 */
export const updateToursGuardians = async () => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    // 削除する対応する ID を取得します
    const selectSql = `
          select tours_guardians.id as id
          FROM tours_guardians
          LEFT JOIN tours ON tours_guardians.tour_id = tours.id
          WHERE
              tours.event_date <= CURDATE()
              AND tours_guardians.status_division = 1
              AND tours_guardians.deleted_at IS NULL  
              `;

    const [rows] = await connection.query(selectSql);
    if (rows.length === 0) {
      await connection.commit();
      return true;
    }
    const ids = rows.map((row) => row.id);

    //対応する ID に従って更新と削除に進みます
    const updateSql = `UPDATE tours_guardians SET deleted_at = NOW() WHERE id IN (?)`;

    await connection.query(updateSql, [ids]);
    await connection.commit();
    return true;
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('error', error);
    return false;
  } finally {
    if (db) {
      await db.close();
    }
  }
};
