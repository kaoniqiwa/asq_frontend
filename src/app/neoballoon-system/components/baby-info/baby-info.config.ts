import { BabyInfoModel } from 'src/app/view-model/baby-info.model';
import { EncodeDeviceManageModel } from 'src/app/view-model/encode-device-manage.model';
import { TableColumnModel } from 'src/app/view-model/table.model';

export const BybyInfoManageConf: TableColumnModel[] = [

  {
    columnDef: 'Name',
    header: '宝宝姓名',
    cell: (element: BabyInfoModel) => `${element.Name}`,
  },
  {
    columnDef: 'Birthday',
    header: '出生年龄',
    cell: (element: BabyInfoModel) => `${element.Birthday}`,
  },
  {
    columnDef: 'ParentName',
    header: '家长',
    cell: (element: BabyInfoModel) => `${element.ParentName}`,
  },
  {
    columnDef: 'CreateTime',
    header: '筛查时间',
    cell: (element: BabyInfoModel) => `${element.CreateTime}`,
  },

  {
    columnDef: 'Status',
    header: '状态',
    cell: (element: BabyInfoModel) => `${element.Status}`,
  },
  {
    columnDef: 'FileId',
    header: '档案号',
    cell: (element: BabyInfoModel) => `【${element.FileId}】`,
    stopPropogate: true,
  },


];
