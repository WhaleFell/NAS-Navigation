// src/plugin/notice.ts 系统级提醒

import { ElNotification } from 'element-plus'
import {
  NotificationParams,
  MessageParams,
} from 'element-plus'
import { ElMessage } from 'element-plus'

export enum NoticeType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
}

export const useNotice = (
  title: string,
  content: string,
  type: NoticeType | string = NoticeType.INFO,
) => {
  ElNotification({
    title: title,
    message: content,
    type: type,
    duration: 1000,
  } as NotificationParams)
}

export const useMsg = (
  content: string,
  type: NoticeType | string = NoticeType.INFO,
) => {
  ElMessage({
    showClose: true,
    message: content,
    type: type,
    duration: 1000,
  } as MessageParams)
}
