import { Message } from 'element-ui';
import { CloneDeep } from '@/common/utils/global-utils';

const tip = (opt = {}) => {
    const defaultOpt = {
        showClose: true
    };
    return Message({ ...defaultOpt, ...CloneDeep(opt) });
};

export default {
    success(msg) {
        return tip({ message: msg, type: 'success' });
    },
    error(msg) {
        return tip({ message: msg, type: 'error' });
    },
    warning(msg) {
        return tip({ message: msg, type: 'warning' });
    },
    info(opt) {
        return tip(opt);
    }

};