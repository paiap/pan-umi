/* eslint-disable */
declare namespace ModelList {
  interface ModelFolderParams {
    page: number;
    pageSize: number;
    name?: string;
    sourceLabel?: string;
    abilityLabel?: string;
    modelScale?: string;
    modelLanguage?: string;
    applicationArea?: string;
    modelPeriod?: string;
    baseKind?: string;
    directionType?: string;
    focused?: boolean;
    minTrainCount?: number;
    maxTrainCount?: number;
    minIllationCount?: number;
    maxIllationCount?: number;
  }

  interface modeldetailParam {
    modelFolderId: number;
    name: string;
    description: string;
    imageUrl: string;
    focused: boolean;
    modelVersion: string;
    wosStatus: number;
    trainDatasetNum: number;
    trainDatasetTaggingRefNum: number;
    trainTaskCount: number;
    trainTaskSuccess: number;
    trainTaskTrainHour: string;
    trainTaskCost: number;
    trainTaskCardHour: number;
    modelVersionNum: number;
    evaluationBest: number;
    evaluationUp: number;
    testBest: number;
    testUp: number;
    illationAppNum: number;
    illationAppCardHour: number;
    illationAppRecent: number;
  }

  interface ModelFolderResult {
    data: {
      page: number;
      pageSize: number;
      total: number;
      pageTotal?: number;
      data: modeldetailParam[];
    };
  }

  interface WoStatusParam {
    name: string;
    color: string;
  }
}
