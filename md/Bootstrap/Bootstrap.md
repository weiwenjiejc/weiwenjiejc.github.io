# css

.container类在屏幕宽度小于等于767px的时候，宽度=屏幕宽度的，也就是100%，container-fluid类不管屏幕宽度大小，一直是100%



（1）.container类出现内边距和外边距，.container-fluid类没有。

（2）.container类左右内边距一直是15px，屏幕小于等于767px的时候没有margin值，屏幕大于767px开始有左右margin值，屏幕宽度为768px和1000px的时候，margin值相对最小，分别是9px和15px，其他时候margin值随着屏幕的增大而增大。.container-fluid类宽度不管屏幕宽度大小，一直是100%。

.col-xs- 超小屏幕 手机 (<768px)

.col-sm- 小屏幕 平板 (≥768px)

.col-md- 中等屏幕 桌面显示器 (≥992px)

.col-lg- 大屏幕 大桌面显示器 (≥1200px)