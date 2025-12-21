// 鱼跃效果集成脚本 - 修复页脚变宽问题
(function() {
  console.log('Fish effect script loaded');
  
  function initFishEffect() {
    console.log('Initializing fish effect');
    
    // 确保jQuery已加载
    if (typeof jQuery === 'undefined') {
      console.error('jQuery is required for fish effect');
      return;
    }
    
    // 添加鱼跃效果容器到页脚
    var $footer = $("#footer");
    if ($footer.length === 0) {
      console.error('Footer element not found, trying alternative selector');
      $footer = $("footer");
    }
    
    if ($footer.length === 0) {
      console.error('Footer element not found');
      return;
    }
    
    console.log('Footer found:', $footer[0]);
    
    // 如果容器已存在，先移除
    $('#jsi-flying-fish-container').remove();
    
    // 添加容器
    $footer.append(
      '<div class="container" id="jsi-flying-fish-container"></div>'
    );
    console.log('Container added to footer');
    
    // 添加CSS样式确保容器不会影响页脚布局
    var styleId = 'fish-effect-styles';
    if (!$('#' + styleId).length) {
      var style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #jsi-flying-fish-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0; /* 在页脚背景之上，但在页脚内容之下 */
          overflow: hidden;
        }
        #jsi-flying-fish-container canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        footer {
          position: relative !important;
          min-height: 100px; /* 确保页脚有足够高度 */
        }
        .footer-other, .footer-flex, .footer-copyright, .footer_custom_text {
          position: relative;
          z-index: 1; /* 确保页脚内容在鱼跃效果之上 */
        }
      `;
      document.head.appendChild(style);
      console.log('CSS styles added');
    }
    
    // 加载鱼跃效果脚本 - 使用异步加载避免同步请求警告
    var scriptId = 'fish-effect-script';
    if (!$('#' + scriptId).length) {
      var script = document.createElement('script');
      script.id = scriptId;
      script.src = '/config/scripts/fish.js';
      script.async = true;
      script.defer = true; // 添加defer属性
      script.onload = function() {
        console.log('Fish.js loaded successfully');
      };
      script.onerror = function() {
        console.error('Failed to load fish.js');
      };
      // 使用setTimeout避免同步操作
      setTimeout(function() {
        document.body.appendChild(script);
        console.log('Fish.js script element added');
      }, 0);
    }
  }
  
  // 使用requestAnimationFrame避免同步操作
  function safeInit() {
    if (window.requestAnimationFrame) {
      requestAnimationFrame(function() {
        if (typeof jQuery !== 'undefined' && jQuery.isReady) {
          initFishEffect();
        } else {
          // 如果jQuery未就绪，等待
          if (typeof jQuery !== 'undefined') {
            $(document).ready(initFishEffect);
          } else {
            // 备用方案
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', initFishEffect);
            } else {
              initFishEffect();
            }
          }
        }
      });
    } else {
      // 降级方案
      setTimeout(function() {
        if (typeof jQuery !== 'undefined') {
          $(document).ready(initFishEffect);
        } else {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initFishEffect);
          } else {
            initFishEffect();
          }
        }
      }, 100);
    }
  }
  
  // 延迟初始化以避免阻塞
  setTimeout(safeInit, 0);
})();
