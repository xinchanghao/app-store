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
     public function indexdata()
    {
       $start = Input('post.start');
       //echo($start);
       $list = db('apps')->order('AppID asc')->limit($start, 5)->select();
       return (array( 'result'=>$list,'status'=>1, 'msg'=>'获取成功！'));
    }

    //打印排行页
    public function rank()
    {
       $total=db('apps')->count();
       $apps=db('apps')->where('AppStatus',1)->order("DownloadCount DESC")->limit(5)->select();
       $view = new View();
       $view->assign('total',$total);
       $view->assign('apps',$apps);
       return $view->fetch('Rank/rank');
    }
     public function rankdata()
    {
       $start = Input('post.start');
       $list = db('apps')->order('DownloadCount DESC')->limit($start, 5)->select();
       return (array( 'result'=>$list,'status'=>1, 'msg'=>'获取成功！'));
    }

    //打印详情页
    public function detail()
    {
        $apps=db('apps')->where('AppStatus',1)->select();
        $view = new View();
        $view->assign('apps',$apps);
        return $view->fetch('Detail/detail');
    }

    //打印分类页
    public function category()
    {
        $cate=db('category')->select();
        $view = new View();
        $view->assign('cate',$cate);
        return $view->fetch('Category/category');
    }

    //打印必备页
    public function zjbb()
    {
        $view = new View();
        //$view->assign('apps',$apps);
        return $view->fetch('Zjbb/zjbb');
    }
    public function zjbbdata()
    {

        //$data=db('category')->alias('c')->join('apps a','c.CategoryID=a.CategoryID')->order("DownloadCount DESC")->select();
        $cate=db('category')->select();
        //$view = new View();
        //$view->assign('cate',$cate);
        //foreach($cate as $n=> $val){
        //echo $n;
           // $result[$n]=db('apps')->alias('a')->join('category c','c.CategoryID=a.CategoryID')->where('apps.CategoryID="%d"',$n)->order("DownloadCount DESC")->limit(5)->select();
        //}
//var_dump($result);
        //die();
        return (array( 'result'=>$cate,'status'=>1, 'msg'=>'获取成功！'));
    }



}
