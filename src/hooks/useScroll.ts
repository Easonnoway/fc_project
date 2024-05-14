import { onMounted,ref } from "vue";
onMounted(() => {
  window.addEventListener("scroll",scrolling)
})
let oldScrollTop = ref(0)
let isHide = ref('true')
function scrolling(){
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
      document.body.scrollTop
    // 滚动条滚动的距离
    let scrollStep = scrollTop - oldScrollTop.value;
    // 更新——滚动前，滚动条距文档顶部的距离
    oldScrollTop.value = scrollTop;
    if (scrollStep < 0) {
      isHide.value = 'false';
    } else {
      isHide.value = 'true';
    }
  }

