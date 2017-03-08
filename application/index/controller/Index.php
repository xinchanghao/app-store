<?php
namespace app\index\controller;
use think\View;
use think\Controller;

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

    //打印首页
    public function detail()
    {
        $apps=db('apps')->where('AppStatus',1)->select();
        //var_dump($apps);
        $view = new View();
        $view->assign('apps',$apps);
        return $view->fetch('index');
    }

}
