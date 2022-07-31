import { BabyInfoManageModel } from 'src/app/view-model/baby-info-manage.model';
import { EncodeDeviceManageModel } from 'src/app/view-model/encode-device-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const BybyInfoManageConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '宝宝姓名',
    cell: (element: BabyInfoManageModel) => `${element.Name}`,
  },
  {
    columnDef: 'Birthday',
    header: '出生年龄',
    cell: (element: BabyInfoManageModel) => `${element.Birthday}`,
  },
  {
    columnDef: 'ParentName',
    header: '家长',
    cell: (element: BabyInfoManageModel) => `${element.ParentName}`,
  },
  {
    columnDef: 'CreateTime',
    header: '筛查时间',
    cell: (element: BabyInfoManageModel) => `${element.CreateTime}`,
  },

  {
    columnDef: 'Status',
    header: '状态',
    cell: (element: BabyInfoManageModel) => `${element.Status}`,
  },
  {
    columnDef: 'FileId',
    header: '档案号',
    cell: (element: BabyInfoManageModel) => `【${element.FileId}】`,
    stopPropogate: true,
  },


];
