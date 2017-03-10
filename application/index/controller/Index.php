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
        $total=db('apps')->count();
        $apps=db('apps')->where('AppStatus',1)->limit(5)->order("AppID ASC")->select();
        //var_dump($apps);
        $view = new View();
        $view->assign('total',$total);
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
        $cate=db('category')->select();
        //var_dump($apps);
        $view = new View();
        $view->assign('cate',$cate);
        return $view->fetch('Category/category');
    }

    public function data()
    {
       $start = Input('post.start');
       //echo($start);
       $list = db('apps')->limit($start, 5)->order('AppID asc')->select();
       return (array( 'result'=>$list,'status'=>1, 'msg'=>'获取成功！'));
    }

}
