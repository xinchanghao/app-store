<?php
namespace app\index\controller;
use think\View;
use think\Controller;
$request = \think\Request::instance();
define('ACTION_NAME', $request->action());
class Index
{
    //打印首页
    public function index()
    {
        $apps=db('apps')->where('AppStatus',1)->select();
        //var_dump($apps);
        $view = new View();
        $view->assign('apps',$apps);
        return $view->fetch('index');
    }

    //打印详情页
    public function detail()
    {
        $apps=db('apps')->where('AppStatus',1)->select();
        //var_dump($apps);
        $view = new View();
        $view->assign('apps',$apps);
        return $view->fetch('Detail/detail');
    }

    //打印分类页
    public function category()
    {
        $apps=db('apps')->where('AppStatus',1)->select();
        //var_dump($apps);
        $view = new View();
        $view->assign('apps',$apps);
        return $view->fetch('Category/category');
    }

}
