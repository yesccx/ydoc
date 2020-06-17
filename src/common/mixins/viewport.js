/*
 * 适用于单页面的，window.resize事件监听
 * PS: 用来做自适应
 * TODO: window.resize事件应该加入防抖机制
 *
 * @Created: 2019-04-09 10:55:17
 * @Author: yesc (yes.ccx@gmail.com)
 */

// 实例:

// <script>
//     import Viewport from '@/common/mixins/viewport';
//     export default {
//         mixins [Viewport],
//         watch: {
//             viewportIsXs(val) {
//                 if (val) {
//                     console.log('当前窗口宽度小于768');
//                 } else {
//                     console.log('当前窗口宽度大于等于768');
//                 }
//             },
//             viewportWindowWidth(val) {
//                 console.log('当前窗口宽度为' + val);
//             }
//             viewportIsXs: {
//                 handler(val) {
//                     if (val) {
//                         console.log('当前窗口宽度小于768');
//                     } else {
//                         console.log('当前窗口宽度大于等于768');
//                     }
//                 },
//                 immediate: true // 立即触发，即初始化的时候也会响应一次
//             },
//         }
//     }
// </script>

export default {
    computed: {
        // xs window.width < 768
        viewportIsXs() {
            return this.viewportWindowWidth < 768;
        },
        // sm 768 <= window.width < 992
        viewportIsSm() {
            return this.viewportWindowWidth >= 768 && this.viewportWindowWidth < 992;
        },
        // md 992 <= window.width < 1200
        viewportIsMd() {
            return this.viewportWindowWidth >= 992 && this.viewportWindowWidth < 1200;
        },
        // lg 1200 <= window.width < 1920
        viewportIsLg() {
            return this.viewportWindowWidth >= 1200 && this.viewportWindowWidth < 1920;
        },
        // xl window.width >= 1920
        viewportIsXl() {
            return this.viewportWindowWidth >= 1920;
        }
    },
    data() {
        return {
            viewportWindowWidth: 0,
            viewportWindowHeight: 0
        };
    },
    // 组件进入时，初始化事件
    created() {
        this.viewportOnWindowResize();
        window.addEventListener('resize', this.viewportOnWindowResize);
    },
    activated() {
        this.viewportOnWindowResize();
        window.addEventListener('resize', this.viewportOnWindowResize);
    },

    // 组件离开或被销毁时，移除事件
    destroyed() {
        window.removeEventListener('resize', this.viewportOnWindowResize);
    },
    deactivated() {
        window.removeEventListener('resize', this.viewportOnWindowResize);
    },

    methods: {
        viewportOnWindowResize() {
            this.viewportWindowWidth = window.innerWidth;
            this.viewportWindowHeight = window.innerHeight;
        }
    }
};