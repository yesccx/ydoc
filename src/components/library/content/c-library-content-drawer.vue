<template>
    <div class="c-library-content-drawer">
        <c-library-drawer-doc />
        <c-library-drawer-doc-templates />
        <c-library-drawer-doc-template-info />
        <c-library-drawer-doc-historys />
    </div>
</template>

<script>
    export default {
        name: 'c-library-content-drawer',
        components: {
            'c-library-drawer-doc': () => import('@/components/library/drawer/c-library-drawer-doc'),
            'c-library-drawer-doc-templates': () => import('@/components/library/drawer/c-library-drawer-doc-templates'),
            'c-library-drawer-doc-template-info': () => import('@/components/library/drawer/c-library-drawer-doc-template-info'),
            'c-library-drawer-doc-historys': () => import('@/components/library/drawer/c-library-drawer-doc-historys')
        }
    };
</script>