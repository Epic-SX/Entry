import { LoadingButton } from '@/components';
import { getConfig } from '@/constants/config';
import { formatDateHourMinute } from '@/libs';
import { TGuest } from '@/types';
import { ColumnDef, Table, flexRender } from '@tanstack/react-table';
import moment from 'moment';
import React, { FC } from 'react';

const list_status = getConfig('tours_guardian_status') as Record<string, string>;

const statusMap = {
    '_0': {
        label: list_status['0'],
        className: 'btn btn-outline-primary p-0 pb-1 pe-2'
    },
    '_1': {
        label: list_status['1'],
        className: 'btn btn-outline-secondary p-0 pb-1 pe-2'
    },
    '_9': {
        label: list_status['9'],
        className: 'btn btn-outline-danger p-0 pb-1 pe-2'
    },
    '_2': {
        label: list_status['2'],
        className: 'btn btn-outline-success p-0 pb-1 pe-2'
    },
    '_3': {
        label: list_status['3'],
        className: 'btn btn-outline-secondary p-0 pb-1 pe-2'
    }
}

export const tourGuardianTableColumns: ColumnDef<TGuest>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <input
                className="form-check-input"
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <input
                className="form-check-input"
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    },
    {
        accessorKey: "guardian_name",
        header: () => <span className="text-nowrap">保護者名</span>,
        cell: ({ row }) => (<span className="text-nowrap">{row.getValue("guardian_name")}</span>)
    },
    {
        accessorKey: "child_name",
        header: () => <span className="text-nowrap">お子さん氏名</span>,
        cell: ({ row }) => (<span className="text-nowrap">{row.getValue("child_name")}</span>)
    },
    {
        accessorKey: "tel",
        header: () => <span className="text-nowrap">電話番号</span>,
        cell: ({ row }) => (<span className="text-nowrap">{row.getValue("tel")}</span>)
    },
    {
        accessorKey: "send_mail_date",
        header: () => <span className="text-nowrap">考査案内メール送信日時</span>,
        cell: ({ row }) => {
            const send_mail_date = formatDateHourMinute(row.getValue("send_mail_date"));
            return (<span className="text-nowrap">{send_mail_date}</span>)
        }
    },
];

type Props = {
    table: Table<TGuest>;
    cancelDate: string;
    toursGuardianId: number | null;
    isMailSending: boolean;
    isStatusUpdating: boolean;
    onChangeCancelDate: (e: any, tours_guardian_id: number) => void;
    onUpdateStatus: (tours_guardian_id: number, status: string) => void;
    onUpdateCancelDate: (tours_guardian_id: number) => void;
    onShowModalSendMail: (tours_guardian_id: number, email: string, name: string) => void;
    onShowModalDelete: (tours_guardian_id: number) => void;
}

const TourGuardianTable: FC<Props> = ({
    table,
    cancelDate,
    toursGuardianId,
    isMailSending,
    isStatusUpdating,
    onChangeCancelDate,
    onUpdateStatus,
    onUpdateCancelDate,
    onShowModalSendMail,
    onShowModalDelete
}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th className="text-center" key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-0 text-center">
                                        <span className="text-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </span>
                                    </td>
                                ))}
                                <td>
                                    <div className="btn-group btn-group btn-group-toggle" data-toggle="buttons">
                                        {
                                            Object.entries(statusMap).map(([key, { label, className }], index) => {
                                                if (key[1] === '2') {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <label className="p-0 pb-1">
                                                                <input
                                                                    className="pb-1 border border-start-0"
                                                                    name="cancel_date-7"
                                                                    type="date"
                                                                    value={row.original.tours_guardian_id === toursGuardianId
                                                                        ? cancelDate ? cancelDate : (row.original.cancel_date || "")
                                                                        : row.original.cancel_date || ""
                                                                    }
                                                                    onChange={e => onChangeCancelDate(e, row.original.tours_guardian_id)}
                                                                    onBlur={() => onUpdateCancelDate(row.original.tours_guardian_id)}
                                                                    disabled={row.original.status_division !== 9}
                                                                    min={moment().format("YYYY-MM-DD")}
                                                                />
                                                            </label>
                                                            <label
                                                                className={row.original.status_division === +key[1] ? className + ' active' : className}
                                                                key={index}
                                                                onClick={() => onUpdateStatus(row.original.tours_guardian_id, key[1])}
                                                            >
                                                                <small className="text-nowrap pe-2 ps-2">{label}</small>
                                                            </label>
                                                        </React.Fragment>
                                                    );
                                                } else {
                                                    return (
                                                        <label
                                                            className={row.original.status_division === +key[1] ? className + ' active' : className}
                                                            key={index}
                                                            onClick={() => onUpdateStatus(row.original.tours_guardian_id, key[1])}
                                                        >
                                                            <small className="text-nowrap pe-2 ps-2">{label}</small>
                                                        </label>
                                                    );
                                                }
                                            })
                                        }
                                    </div>
                                </td>
                                <td>
                                    <button 
                                        className='btn btn-danger pt-1 pb-1 me-1'  
                                        onClick={()=> onShowModalDelete(row.original.tours_guardian_id)}
                                        >
                                            <i className="fas fa-trash-alt me-1"></i>
                                            <span>削除</span>
                                    </button>
                                    {isMailSending
                                        && row.original.tours_guardian_id === toursGuardianId
                                        ? <LoadingButton label='送信中' />
                                        : (
                                            <button
                                                className="btn btn-primary fa fa-envelope pt-2 pb-2 text-nowrap"
                                                onClick={() => onShowModalSendMail(row.original.tours_guardian_id, row.original.email, row.original.guardian_name)}
                                            >
                                                <small>考査案内メール送信</small>
                                            </button>
                                        )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={tourGuardianTableColumns.length} className="text-center">
                                会員はいません
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TourGuardianTable;