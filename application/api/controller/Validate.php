<?php
namespace app\api\Validate;
use think\Controller;
use think\Validate;


class User extends Validate
{
    protected $rule = [
        'name'  =>  'require|max:25',
        'password' =>  'require',
    ];

    protected $message = [
        'name.require'  =>  '用户名必须',
        'name.max' =>  '用户名不超过25个字符',
        'password.require'=>'登录密码必须',
    ];

    protected $scene = [
        'login'   =>  ['name','password'],
        //'edit'  =>  ['email'],
    ];
}




