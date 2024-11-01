import db from './database/mysql2-utils.js';
import { updateToursGuardians } from './services/tours-guardians-service.js';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  try {
    const updateResult = await updateToursGuardians();
    if (updateResult) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: '成功',
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: '失敗',
        }),
      };
    }
  } catch (error) {
    console.error('Lambda handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: '予期しないエラーが発生しました',
      }),
    };
  } finally {
    await db.close();
  }
};
