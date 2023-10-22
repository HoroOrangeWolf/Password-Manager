import DialogModesConstant from '../constant/dialogModes.constant';

type DialogModesTypeof = typeof DialogModesConstant;

type DialogModesKeys = keyof DialogModesTypeof;

export type DialogModeTypes = DialogModesTypeof[DialogModesKeys]
