import { LIBRARY_GROUP_KEY, LIBRARY_KEY } from '@/extends/utils/library-group-manager';
import { CloneDeep, ForEach } from '@/common/utils/global-utils';

// 构建entity集合（文档库分组、文档库）
export const buildEntityCollection = function (olibraryGroups, olibrarys) {
    const collection = [];
    const libraryGroups = CloneDeep(olibraryGroups);
    const librarys = CloneDeep(olibrarys);

    // 建立文档库分组Map
    const libraryGroupMap = {};
    librarys.forEach(library => {
        if (!libraryGroupMap[library.group_id]) {
            libraryGroupMap[library.group_id] = [];
        }
        libraryGroupMap[library.group_id].push({
            id: library.library_info.id,
            label: library.library_info.name,
            group_id: library.group_id,
            children: [],
            sort: library.library_info.sort,
            type: LIBRARY_KEY,
            key: `${LIBRARY_KEY}-${library.library_info.id}`
        });
    });

    // 文档库归组
    libraryGroups.forEach(group => {
        const children = libraryGroupMap[group.id] || [];
        children.sort((a, b) => (a.sort - b.sort));

        collection.push({
            id: group.id,
            label: group.name,
            children,
            sort: group.sort,
            type: LIBRARY_GROUP_KEY,
            key: `${LIBRARY_GROUP_KEY}-${group.id}`
        });

        delete libraryGroupMap[group.id];
    });
    collection.sort((a, b) => (a.sort - b.sort));

    // 默认分组
    ForEach(libraryGroupMap, (librarys) => {
        librarys.map(library => { library.group_id = 0; return library; });
        collection.unshift(...librarys);
    });

    return collection;
};

// 计算拖拽后的entity排序值
export const computedEntityPosition = function (libraryGroupCollection, dropType, draggingNode, dropNode) {
    if (draggingNode.type === LIBRARY_KEY && dropType.type === LIBRARY_GROUP_KEY && dropType !== 'inner') {
        return { sort: 0, groupId: 0 };
    } else if (draggingNode.type === LIBRARY_KEY && dropType.type === LIBRARY_KEY && dropType.group_id === 0) {
        return { sort: 0, groupId: 0 };
    }
    const dataTree = libraryGroupCollection;
    let nodeGroupId = 0;
    let nodeSort = 0;
    if (dropType === 'inner') {
        nodeGroupId = dropNode.id;
    } else {
        nodeGroupId = dropNode.type === LIBRARY_GROUP_KEY ? 0 : dropNode.group_id;
    }

    // 找到结点排序后的目标分组
    let targetGroup = searchEntityTargetGroup(dataTree, nodeGroupId);
    if (targetGroup === null) {
        targetGroup = { children: dataTree };
    }

    switch (dropType) {
        case 'inner': // 项内
            nodeSort = targetGroup.children.length > 1 ? targetGroup.children.slice(-2, -1)[0].sort + 10000 : 10000;
            break;
        case 'before': // 项前
            targetGroup.children.forEach((node, key, data) => {
                if (node.id === dropNode.id) {
                    let adjoinSort = key <= 1 ? 0 : data[key - 2].sort;
                    nodeSort = (node.sort + adjoinSort) / 2;
                }
            });
            break;
        case 'after': // 项后
            targetGroup.children.forEach((node, key, data) => {
                if (node.id === dropNode.id) {
                    let adjoinSort = key === data.length - 2 ? node.sort + 20000 : data[key + 2].sort;
                    nodeSort = (node.sort + adjoinSort) / 2;
                }
            });
            break;
    }
    return {
        sort: nodeSort,
        groupId: nodeGroupId
    };
};

// 递归搜索entity上级group信息
const searchEntityTargetGroup = function (dataTree, id) {
    if (id === 0) {
        return { children: dataTree };
    }

    let targetGroup = null;
    dataTree.forEach(node => {
        if (node.type === LIBRARY_GROUP_KEY && node.id === id) {
            targetGroup = node;
        }

        if (!targetGroup && Array.isArray(node.children) && node.children.length > 0) {
            targetGroup = searchEntityTargetGroup(node.children, id);
        }
    });

    return targetGroup;
};