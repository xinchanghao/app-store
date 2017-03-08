-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-06-15 20:09:32
-- 服务器版本： 5.5.31
-- PHP Version: 5.5.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appstore_store`
--

-- --------------------------------------------------------

--
-- 表的结构 `apps`
--

CREATE TABLE `apps` (
  `AppID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AppName` text COLLATE gbk_bin NOT NULL,
  `AppDetail` text COLLATE gbk_bin NOT NULL,
  `SymbolName` text COLLATE gbk_bin NOT NULL,
  `AppStatus` int(11) NOT NULL,
  `DownloadCount` int(11) NOT NULL DEFAULT '0',
  `Note` text COLLATE gbk_bin,
  `Sort` int(11) NOT NULL DEFAULT '0',
  `Ico` text COLLATE gbk_bin,
  `Pic` text COLLATE gbk_bin,
  `VersionID` int(11) DEFAULT '0',
  `Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

--
-- 转存表中的数据 `apps`
--

INSERT INTO `apps` (`AppID`, `CategoryID`, `UserID`, `AppName`, `AppDetail`, `SymbolName`, `AppStatus`, `DownloadCount`, `Note`, `Sort`, `Ico`, `Pic`, `VersionID`, `Time`) VALUES
(11, 12, 10, '111', '12312', '1111', 1, 0, NULL, 0, NULL, '2016-06-15/576103cb5fe54.png', 0, '0000-00-00 00:00:00'),
(123423432, 10, 11, 'PS', 'qweqw', 'ps.1.05.test', 1, 0, NULL, 0, NULL, NULL, 0, '0000-00-00 00:00:00'),
(123423436, 12, 10, 'aa', 'aaa', 'aaaa', 1, 0, NULL, 0, NULL, '2016-06-15/5761077d39668.jpg', 0, '0000-00-00 00:00:00'),
(123423437, 3, 10, '杀毒软件', '360安全杀毒', '360.com.in', 1, 0, NULL, 0, NULL, '2016-06-15/5761080c19f49.png', 0, '0000-00-00 00:00:00'),
(123423438, 8, 10, '云音乐', '网易云音乐', '网易晕', 1, 0, NULL, 0, NULL, '2016-06-15/57610851c4530.png', 0, '0000-00-00 00:00:00'),
(123423439, 10, 12, '火狐', '火狐浏览器\r\n', 'firefox 2.0.0', 0, 0, NULL, 0, NULL, '2016-06-15/57610925c9857.png', 0, '0000-00-00 00:00:00'),
(123423440, 13, 12, '搜狗拼音', '搜狗拼音输入法', 'test.sougou.com', 1, 0, NULL, 0, NULL, '2016-06-15/57610951460b4.png', 0, '0000-00-00 00:00:00'),
(123423441, 6, 12, '微软办公软件', '办公用品', 'Mocrosoft Powint', 1, 0, NULL, 0, NULL, '2016-06-15/5761099877729.png', 0, '0000-00-00 00:00:00'),
(123423442, 9, 12, '英雄联盟', '英雄联盟客户端', 'LOL.com.cn', 1, 0, NULL, 0, NULL, '2016-06-15/576109d1e8ab9.png', 0, '0000-00-00 00:00:00'),
(123423443, 10, 14, '谷歌浏览器', '谷歌浏览器', 'google.com.http', 0, 0, NULL, 0, NULL, '2016-06-15/57612df0ec707.jpg', 0, '0000-00-00 00:00:00'),
(123423445, 9, 14, 'QQ飞车', '腾讯游戏QQ飞车', 'qq131.car.rar', 1, 0, NULL, 0, NULL, '2016-06-15/57612eb1201e6.jpg', 0, '0000-00-00 00:00:00'),
(123423446, 11, 14, '暴风影音', '暴风视频', 'baofengyingyin2.0.rar.', 1, 0, NULL, 0, NULL, '2016-06-15/57612ee370e58.jpg', 0, '0000-00-00 00:00:00'),
(123423447, 2, 15, '流光', '系统安全流光扫描', 'flash 2.0.0', 1, 0, NULL, 0, NULL, '2016-06-15/57612fcb0ff24.jpg', 0, '0000-00-00 00:00:00'),
(123423448, 4, 15, 'Sublime', '编辑器sublime', 'sublime editor.rar', 1, 0, NULL, 0, NULL, '2016-06-15/5761301676308.jpg', 0, '0000-00-00 00:00:00'),
(123423449, 9, 15, '战舰世界', '战舰世界游戏', 'world of ship', 1, 0, NULL, 0, NULL, '2016-06-15/5761303ace742.jpg', 0, '0000-00-00 00:00:00'),
(123423450, 4, 15, 'PHPstorm', '编程软件', 'phpstorm Editor', 1, 0, NULL, 0, NULL, '2016-06-15/5761308e03857.jpg', 0, '0000-00-00 00:00:00'),
(123423451, 4, 15, 'IDEA', '231432', 'idea.rar.jar', 1, 0, NULL, 0, NULL, '2016-06-15/576130a7c9813.jpg', 0, '0000-00-00 00:00:00'),
(123423452, 12, 15, '微信客户端', 'asdfasfasfaw', 'wechat.rar', 0, 0, NULL, 0, NULL, '2016-06-15/576130ca5571b.jpg', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` text COLLATE gbk_bin NOT NULL,
  `Sort` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`CategoryID`, `CategoryName`, `Sort`) VALUES
(1, '其他', 0),
(2, '系统工具', 0),
(3, '安全杀毒', 0),
(4, '编程', 0),
(5, '插件', 0),
(6, '办公', 0),
(7, '图像', 0),
(8, '音乐', 0),
(9, '游戏', 0),
(10, '浏览器', 0),
(11, '视频', 0),
(12, '聊天', 0),
(13, '输入法', 0);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` text COLLATE gbk_bin NOT NULL,
  `Password` text COLLATE gbk_bin NOT NULL,
  `Name` text COLLATE gbk_bin NOT NULL,
  `Email` text COLLATE gbk_bin NOT NULL,
  `Permission` int(11) NOT NULL,
  `RegTime` datetime NOT NULL,
  `LastLoginTime` datetime NOT NULL,
  `LastLoginIP` text COLLATE gbk_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Name`, `Email`, `Permission`, `RegTime`, `LastLoginTime`, `LastLoginIP`) VALUES
(1, 'w', '', '', 'w', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', ''),
(10, '111', '111', '沈', '123@qq.com', 1, '2016-06-14 19:49:30', '0000-00-00 00:00:00', ''),
(11, 'f', 'f', 'f', 'f@qq.com', 2, '2016-06-14 21:54:13', '0000-00-00 00:00:00', ''),
(12, '222', '222', '辛', '22@qq.com', 2, '2016-06-15 15:51:13', '0000-00-00 00:00:00', ''),
(13, '333', '333', '刘', 'liu@qq.com', 2, '2016-06-15 15:55:57', '0000-00-00 00:00:00', ''),
(14, '444', '444', '梅', '444@163.com', 2, '2016-06-15 18:27:39', '0000-00-00 00:00:00', ''),
(15, '123', '123', '化风', '123@163.com', 1, '2016-06-15 18:33:56', '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- 表的结构 `versions`
--

CREATE TABLE `versions` (
  `AppID` int(11) NOT NULL,
  `VersionID` int(11) NOT NULL,
  `VersionName` text COLLATE gbk_bin NOT NULL,
  `VersionStatus` int(11) NOT NULL,
  `Time` datetime NOT NULL,
  `Log` text COLLATE gbk_bin NOT NULL,
  `DownloadCount` int(11) NOT NULL DEFAULT '0',
  `Note` text COLLATE gbk_bin
) ENGINE=InnoDB DEFAULT CHARSET=gbk COLLATE=gbk_bin;

--
-- 转存表中的数据 `versions`
--

INSERT INTO `versions` (`AppID`, `VersionID`, `VersionName`, `VersionStatus`, `Time`, `Log`, `DownloadCount`, `Note`) VALUES
(1, 1, '1.0', 1, '2016-06-07 00:00:00', '123', 0, '123'),
(1, 2, '12312', 12, '2016-06-15 00:00:00', '1231', 0, '213'),
(2, 1, '123', 123, '2016-06-14 00:00:00', '1231', 0, '23'),
(123423442, 1, '', 0, '0000-00-00 00:00:00', '', 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apps`
--
ALTER TABLE `apps`
  ADD PRIMARY KEY (`AppID`),
  ADD KEY `UserID` (`UserID`) USING BTREE,
  ADD KEY `CategoryID_2` (`CategoryID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `versions`
--
ALTER TABLE `versions`
  ADD PRIMARY KEY (`AppID`,`VersionID`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `apps`
--
ALTER TABLE `apps`
  MODIFY `AppID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123423453;
--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- 限制导出的表
--

--
-- 限制表 `apps`
--
ALTER TABLE `apps`
  ADD CONSTRAINT `apps_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`),
  ADD CONSTRAINT `apps_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
