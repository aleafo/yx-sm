$(function() {

$(document).on('click', '.accordion-title', function(){

    var $this = $(this), 
        $parent = $this.parent(), 
        $element = $this.next();
    
    if ($element.hasClass('in')) {
      return;
    }

    //收起已打开的

    var $active = $parent.parent().find('.active'), 
        $activeElement = $active.find('.collapse');
        
    if ($active[0]) {
      $activeElement.css({height:0});

      //等待动画播放完毕，收起
      setTimeout(function(){
        $active.removeClass('active');
        $activeElement.removeClass('in').height('');
      }, 300);
    }

    //展开当前

    //显示出来，然后设置高度为0，这样就可以计算出元素的实际高度了
    $element.removeClass('collapse')
            .addClass('collapsing').height(0);

    //获取盒模型高度，需要包含内边距和边框
    var scrollHeight = $element[0].scrollHeight; 

    $element.removeClass('collapsing')
            .addClass('collapse in')
            .height('')
            .css({height: scrollHeight});
    $parent.addClass('active');

  });


});