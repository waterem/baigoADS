<?php
/*-----------------------------------------------------------------
！！！！警告！！！！
以下为系统文件，请勿修改
-----------------------------------------------------------------*/

//不能非法包含或直接执行
if (!defined('IN_BAIGO')) {
    exit('Access Denied');
}

for ($_iii=1;$_iii<=10;$_iii++) {
    $_arr_percent[$_iii] = $_iii * 10 . '%';
}

return $_arr_percent;
