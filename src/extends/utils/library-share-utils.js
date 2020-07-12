
import { UrlBuilder } from '@/common/utils/global-utils';

// 构建文档库分享链接
export const buildLibraryShareLink = (shareCode) => {
    return UrlBuilder('/library/preview', { code: shareCode });
};