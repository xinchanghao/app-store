<?php
namespace app\api\controller;

use think\Controller;
use think\View;
use think\Loader;
use think\Validate;


class Index extends Controller
{
    public function index()
    {
        $input = json_decode(file_get_contents("php://input"),true);
        $act=$input['act'];
        if($act=='Login')
        {
            $this->login($input);
        }
        else if($act=='Register')
        {
            $this->regist($input);
        }
        else {
            $result = array('status' => "10", 'info' => "Operation failed! Did not submit data!");
            echo json_encode($result);
        }
    }


    public function login($input)
    {
        //获取前台json字符串；
        //json 字符串转为数组格式
        $content = $input['content'];// 获取post变量;此处得到的array变量;
        $data = [
            'name' => $content['username'],
            'password' => $content['password'],
        ];
        $rule = [
            ['name', 'require|length:11', '名称必须|用户名必须为手机号'],
            ['password', 'require|/^([a-fA-F0-9]{32})$/', '登录密码必须|登录密码格式错误']
        ];
        $validate = new Validate($rule);
        $result = $validate->check($data);
        if (!$result) {
            $result = array('status' => "30", 'info' => $validate->getError());
            echo json_encode($result);
        } else {
            $password = MD5(config("app_salt") . $content['password']);
            $users = db('user')->where(['username' => $content['username'], 'password' => $password])->find();
            if ($users) {
                $result = array('status' => "1", 'info' => "Login success!");
                echo json_encode($result);
            } else {
                $result = array('status' => "0", 'info' => "Login failed, password error!");
                echo json_encode($result);
            }
        }
    }


    public function regist($input)
    {

        $content = $input['content'];// 获取post变量;此处得到的array变量;
        //验证注册数据规则；
        $data = [
            'nickName' => $content['nickName'],
            'name' => $content['username'],
            'password' => $content['password'],
        ];
        $rule = [
            ['nickName', 'require|max:25', '名称必须|名称最多不能超过25个字符'],
            ['name', 'require|length:11', '名称必须|用户名必须为手机号'],
            ['password', 'require|/^([a-fA-F0-9]{32})$/', '登录密码必须|登录密码格式错误']
        ];
        $validate = new Validate($rule);
        $result = $validate->check($data);
        //验证结束；
        if (!$result) {
            $result = array('status' => "30", 'info' => $validate->getError());
            echo json_encode($result);
        } else {
            $users = db('user')->where(['username' => $content['username']])->find();
            if ($users) {
                $result = array('status' => "20", 'info' => "The user name has been registered!");
                echo json_encode($result);
            } else {
                $password = MD5(config("app_salt") . $content['password']);
                $data = [
                    'username' => $content['username'],
                    'password' => $password,
                    'nickName' => $content['nickName']
                ];
                $new = db('user')->insert($data);
                if ($new) {
                    $result = array('status' => "1", 'info' => "Register success!");
                    echo json_encode($result);
                } else {
                    $result = array('status' => "9", 'info' => "Database operation error!");
                    echo json_encode($result);
                }
            }
        }
    }




    public function test()
    {
        $view = new View();
        return $view->fetch('Index/test');
    }


}
