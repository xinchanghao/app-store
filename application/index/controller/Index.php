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
        $id=input('get.id');
        //var_dump($id);
        $apps=db('apps')->where('AppID',$id)->select();
        //print_r($apps[0]['VersionID']);
        //die();
        $versions=db('versions')->where('VersionID',$apps[0]['VersionID'])->find();
        $view = new View();
        $view->assign('apps',$apps);
        $view->assign('versions',$versions);
        return $view->fetch('Detail/detail');

    }


    //打印分类页
    public function category()
    {
        $cate=db('category')->order('CategoryID ASC')->select();
        $view = new View();
        $view->assign('cate',$cate);
        return $view->fetch('Category/category');
    }
    //打印分类列表页
    public function catelist()
    {
        $id=input('get.id');
        $apps=db('apps')->where('CategoryID',$id)->select();
        $cate=db('category')->where('CategoryID',$id)->find();
        $view = new View();
        $view->assign('apps',$apps);
        $view->assign('cate',$cate);
        return $view->fetch('List/list');
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
        foreach($cate as $n=> $val){
             $con['CategoryID']=$val['CategoryID'];
             $apps[$n]=db('apps')->alias('a')->where($con)->order("DownloadCount DESC")->limit(5)->select();
             $data[$n]=array(
             'category'=>$val,
             'app'=>$apps[$n],
             );
        }
        //var_dump($data[10]);
        return (array( 'result'=>$data,'status'=>1, 'msg'=>'获取成功！'));
    }



}
