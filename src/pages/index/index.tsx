import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'
import Taro from '@tarojs/taro';

import { M1, Ui, Event, System } from 'nfcreader-sdk';
import { useState } from 'react';

import gitee_logo from '../../images/gitee_logo.png';
import github_logo from '../../images/github _logo.png';
import notice_png from '../../images/notice_top.png';

export default function Index() {

  const [nfcReadPercent, setNfcReadPercent] = useState<number>(0);  // NFC 数据读取进度
  const [nfcWritePercent, setNfcWritePercent] = useState<number>(0);  // NFC 数据写入进度
  const [pn532ReadPercent, setPn532ReadPercent] = useState<number>(0); // PN532 数据读取进度
  const [pn532WritePercent, setPn532WritePercent] = useState<number>(0); // PN532 数据写入进度
  const [customizeModal, setCustomizeModal] = useState<Ui.Modal>(); // 自定义 Modal

  useLoad(() => {
    console.log('Page loaded.')

    // 注册 NFC 数据读写进度监听函数
    Event.addRWPercentListener('nfcReadPercent', event => setNfcReadPercent(event.value));
    Event.addRWPercentListener('nfcWritePercent', event => setNfcWritePercent(event.value));
    // 注册 PN532 数据读写进度监听函数
    Event.addRWPercentListener('pn532ReadPercent', event => setPn532ReadPercent(event.value));
    Event.addRWPercentListener('pn532WritePercent', event => setPn532WritePercent(event.value));

    // 注册自定义 Modal 弹窗
    const modalConfig: Ui.ModalConfig = {
      title: {
        text: '弹窗标题',
      },
      content: {
        text: '这是弹窗内容',
      },
      subContent: {
        text: '这是弹窗附属内容',
        textAlign: 'right',
        fontColor: 'red'
      },
      confirmBtn: {
        text: '确认按钮',
        bgColor: 'pink',
        fontColor: 'rgba(0,0,0,1)',
      },
      cancelBtn: {
        text: '关闭弹窗',
      },
    };
    const confirmCallback = () => {

      Ui.showToast('点击了确认按钮.', 'long');
    };
    const modal = Ui.createModal(modalConfig, confirmCallback);
    setCustomizeModal(modal);

  })

  const ApiItem = (props: { title: string, desc: string, onClick: () => void }) => {

    return (
      <View className='actionPanelContentApi'>
        <View className='actionPanelContentApiIcon'></View>
        <View className='actionPanelContentApiLeft'>
          <Text className='actionPanelContentApiLabel'>{props.title}</Text>
          <Text className='actionPanelContentApiDesc'>{props.desc}</Text>
        </View>
        <View className='actionPanelContentApiBtn' onClick={props.onClick}>
          <View className='actionPanelContentApiBtnBg'>
            <Text className='actionPanelContentApiBtnText'>执行操作</Text>
          </View>
        </View>
      </View>
    );
  }

  /** 获取用户基础资料点击回调 */
  async function onGetUserinfoClicked() {

    const ret = await System.getUserInfo();
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** NFC 按扇区读取数据点击回调 */
  async function onReadDataByNFCClicked() {

    // 读取数据根据传递的扇区密钥对应，传多少读多少
    const keyArray = [
      {
        sector: 0,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
      {
        sector: 1,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    ];
    const ret = await M1.readSectorByNFC(keyArray);
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** NFC 按扇区写入数据点击回调 */
  async function onWriteDataByNFCClicked() {

    const keyArray = [
      {
        sector: 15,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    ];

    const dataArray = [
      {
        sector: 15,
        data: {
          b0: '01020304040804006263646566676869',
          b1: '00000000000000000000000000000000',
          b2: '00000000000000000000000000000000',
          keyA: 'FFFFFFFFFFFF',
          keyB: 'FFFFFFFFFFFF',
          keyC: 'FF078069',
        },
      },
    ];

    const ret = await M1.writeSectorByNFC(dataArray, keyArray, false);
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** NFC 按块写入数据 */
  async function onWriteBlockByNFCClicked() {

    const ret = await M1.writeBlockByNFC(
      15,
      0,
      '1234567890abcdef0000000000000001',
      {
        sector: 15,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    );

    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 获取NFC开关状态 */
  async function onGetNFCStatusClicked() {

    const ret = await System.getNFCStatus();
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 打开手机NFC设置页面 */
  async function onOpenNFCSettingsClicked() {

    System.openNFCSettings();
  }

  /** PN532 按扇区读取数据 */
  async function onReadDataByPN532Clicked() {

    // 读取数据根据传递的扇区密钥对应，传多少读多少
    const keyArray = [
      {
        sector: 0,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
      {
        sector: 1,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    ];

    const ret = await M1.readSectorByPN532(keyArray);
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** PN532 按扇区写入数据 */
  async function onWriteDataByPN532Clicked() {

    const keyArray = [
      {
        sector: 15,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    ];

    const dataArray = [
      {
        sector: 15,
        data: {
          b0: '01020304040804006263646566676869',
          b1: '00000000000000000000000000000000',
          b2: '00000000000000000000000000000000',
          keyA: 'FFFFFFFFFFFF',
          keyB: 'FFFFFFFFFFFF',
          keyC: 'FF078069',
        },
      },
    ];

    const ret = await M1.writeSectorByPN532(dataArray, keyArray, false);
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** PN532 按块写入数据 */
  async function onWriteBlockByPN532Clicked() {

    const ret = await M1.writeBlockByPN532(
      15,
      0,
      '1234567890abcdef0000000000000001',
      {
        sector: 15,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    );

    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 获取 PN532 读卡器状态 */
  async function onGetPN532StatusClicked() {

    const ret = await System.getPN532Status();
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 连接 PN532 读卡器 */
  async function onConnectPN532Clicked() {

    const ret = await System.connectPN532();
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 调用宿主 UI 读取标签数据 */
  function onReadDataWithUIClicked() {

    // 读取数据根据传递的扇区密钥对应，传多少读多少
    const keyArray = [
      {
        sector: 0,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
      {
        sector: 1,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    ];

    const NFCActionCallback = (result: M1.ReadDataResponse) => {

      Ui.showToast(JSON.stringify(result), 'long');
    };

    const PN532ActionCallback = (result: M1.ReadDataResponse) => {

      Ui.showToast(JSON.stringify(result), 'long');
    };

    M1.readSectorWithUI(keyArray, NFCActionCallback, PN532ActionCallback);
  }

  /** 调用宿主 UI 写入标签数据 */
  function onWriteDataWithUIClicked() {

    const keyArray = [
      {
        sector: 15,
        keyA: 'FFFFFFFFFFFF',
        keyB: 'FFFFFFFFFFFF',
      },
    ];

    const dataArray = [
      {
        sector: 15,
        data: {
          b0: '01020304040804006263646566676869',
          b1: '00000000000000000000000000000000',
          b2: '00000000000000000000000000000000',
          keyA: 'FFFFFFFFFFFF',
          keyB: 'FFFFFFFFFFFF',
          keyC: 'FF078069',
        },
      },
    ];

    const NFCActionCallback = (result: NFCReaderSDK.SDKResponse) => {

      Ui.showToast(JSON.stringify(result), 'long');
    };

    const PN532ActionCallback = (result: NFCReaderSDK.SDKResponse) => {

      Ui.showToast(JSON.stringify(result), 'long');
    };

    M1.writeSectorWithUI(dataArray, keyArray, NFCActionCallback, PN532ActionCallback);
  }

  /** 调用宿主 UI 选择用户保存的密钥文件 */
  async function onSelectKeyByUIClicked() {

    const ret = await M1.selectKeyByUI();
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 调用宿主 UI 选择用户保存的标签文件 */
  async function onSelectCardByUIClicked() {

    const ret = await M1.selectCardByUI();
    Ui.showToast(JSON.stringify(ret), 'long');
  }

  /** 打开自定义 Modal 弹窗 */
  function onOpenModalClicked() {

    // 创建弹窗在页面加载完成回调中配置
    // 此处仅调用
    if (customizeModal) {

      customizeModal.show();

    } else {

      Ui.showToast('未定义的 Modal.', 'long');
    }
  }

  /** 展示原生 Toast */
  function onShowToastClicked() {

    Ui.showToast('原生 Toast 消息.', 'long');
  }

  /** 复制SDK NPM包地址 */
  function onCopyNpmurlCLicked() {

    System.copyToClipboard('https://www.npmjs.com/package/nfcreader-sdk');
    Ui.showToast('已复制到剪贴板.', 'short');
  }

  /** 复制 Gitee 托管地址 */
  function onCopyGitturlClicked() {

    System.copyToClipboard('https://gitee.com/paidaxing222/plugin-demo');
    Ui.showToast('已复制到剪贴板.', 'short');

  }

  /** 复制 Github 托管地址 */
  function onCopyGithubClicked() {

    System.copyToClipboard('https://github.com/paidaxing222/plugin-demo');
    Ui.showToast('已复制到剪贴板.', 'short');
  }

  /** 复制文本到剪贴板 */
  function onCopyToClipboardClicked(){

    System.copyToClipboard('这是复制的文本.');
    Ui.showToast('已复制到剪贴板.', 'short');
  }

  return (
    <View className='topNotice'>
      <View className='noticePanel' onClick={() => onCopyNpmurlCLicked()}>
        <Image className='noticePanelIcon' src={notice_png} />
        <Text className='noticePanelText'>插件开发 SDK 详细文档及说明见 https://www.npmjs.com/package/nfcreader-sdk</Text>
      </View>
      <Text className='topNoticeText'>该插件为 SDK 演示 Demo，插件是使用 Tarojs 3.x 开发的 H5 应用（SPA），用于演示全部的 API 接口。该插件源码可在下列托管网站找到（点击可复制链接）：</Text>
      <View className='topNoticeItem' onClick={() => onCopyGitturlClicked()}>
        <Image src={gitee_logo} className='topNoticeItemIcon' />
        <Text className='topNoticeItemText'>https://gitee.com/paidaxing222/plugin-demo</Text>
      </View>
      <View className='topNoticeItem' onClick={() => onCopyGithubClicked()}>
        <Image src={github_logo} className='topNoticeItemIcon' />
        <Text className='topNoticeItemText'>https://github.com/feichi2016/plugin-demo</Text>
      </View>
      <View className='actionPanel'>
        <View className='actionPanelTitleWrap'>
          <View className='actionPanelTitleIcon'></View>
          <Text className='actionPanelTitle'>用户相关 API</Text>
        </View>
        <View className='actionPanelContent'>
          <ApiItem title='获取用户基础资料' desc='获取当前插件使用者的ID、昵称和头像' onClick={() => onGetUserinfoClicked()}></ApiItem>
        </View>
      </View>
      <View className='actionPanel'>
        <View className='actionPanelTitleWrap'>
          <View className='actionPanelTitleIcon'></View>
          <Text className='actionPanelTitle'>NFC 相关 API</Text>
        </View>
        <View className='actionPanelContent'>
          <View className='actionPanelContentRow'>
            <Text className='actionPanelContentRowItem'>NFC 读取进度： {nfcReadPercent} %</Text>
            <Text className='actionPanelContentRowItem'>NFC 写入进度： {nfcWritePercent} %</Text>
          </View>
          <ApiItem title='NFC 按扇区读取数据' desc='读取目标 M1 卡 0/1 扇区的数据' onClick={() => onReadDataByNFCClicked()}></ApiItem>
          <ApiItem title='NFC 按扇区写入数据' desc='向目标 M1 标签 15 扇区写入数据' onClick={() => onWriteDataByNFCClicked()}></ApiItem>
          <ApiItem title='NFC 按块写入数据' desc='向目标 M1 标签 15 扇区 0 块写入数据' onClick={() => onWriteBlockByNFCClicked()}></ApiItem>
          <ApiItem title='获取 NFC 开关状态' desc='获取当前手机 NFC 开关状态' onClick={() => onGetNFCStatusClicked()}></ApiItem>
          <ApiItem title='打开 NFC 设置页面' desc='跳转至手机 NFC 设置页面' onClick={() => onOpenNFCSettingsClicked()}></ApiItem>
        </View>
      </View>
      <View className='actionPanel'>
        <View className='actionPanelTitleWrap'>
          <View className='actionPanelTitleIcon'></View>
          <Text className='actionPanelTitle'>PN532 读卡器相关 API</Text>
        </View>
        <View className='actionPanelContent'>
          <View className='actionPanelContentRow'>
            <Text className='actionPanelContentRowItem'>PN532 读取进度： {pn532ReadPercent} %</Text>
            <Text className='actionPanelContentRowItem'>PN532 写入进度： {pn532WritePercent} %</Text>
          </View>
          <ApiItem title='PN532 按扇区读取数据' desc='读取目标 M1 卡 0/1 扇区的数据' onClick={() => onReadDataByPN532Clicked()}></ApiItem>
          <ApiItem title='PN532 按扇区写入数据' desc='向目标 M1 标签 15 扇区写入数据' onClick={() => onWriteDataByPN532Clicked()}></ApiItem>
          <ApiItem title='PN532 按块写入数据' desc='向目标 M1 标签 15 扇区 0 块写入数据' onClick={() => onWriteBlockByPN532Clicked()}></ApiItem>
          <ApiItem title='获取 PN532 读卡器状态' desc='获取当前 PN532 读卡器状态' onClick={() => onGetPN532StatusClicked()}></ApiItem>
          <ApiItem title='连接 PN532 读卡器' desc='连接插入手机的 PN532 读卡器' onClick={() => onConnectPN532Clicked()}></ApiItem>
        </View>
      </View>
      <View className='actionPanel'>
        <View className='actionPanelTitleWrap'>
          <View className='actionPanelTitleIcon'></View>
          <Text className='actionPanelTitle'>调用宿主 UI 相关 API</Text>
        </View>
        <View className='actionPanelContent'>
          <ApiItem title='调用宿主 UI 读取数据' desc='自行选择 NFC/PN532 进行数据读取' onClick={() => onReadDataWithUIClicked()}></ApiItem>
          <ApiItem title='调用宿主 UI 写入数据' desc='自行选择 NFC/PN532 进行数据写入' onClick={() => onWriteDataWithUIClicked()}></ApiItem>
          <ApiItem title='调用宿主 UI 选择密钥' desc='调用宿主选择密钥数据文件' onClick={() => onSelectKeyByUIClicked()}></ApiItem>
          <ApiItem title='调用宿主 UI 选择卡片' desc='调用宿主选择卡片数据文件' onClick={() => onSelectCardByUIClicked()}></ApiItem>
          <ApiItem title='自定义 Modal 弹窗' desc='根据配置项自定义 Modal 弹窗外观' onClick={() => onOpenModalClicked()}></ApiItem>
          <ApiItem title='显示安卓原生 Toast 消息' desc='调用安卓系统原生 Toast 展示消息' onClick={() => onShowToastClicked()}></ApiItem>
          <ApiItem title='复制文本到剪贴板' desc='将文本复制到手机剪贴板中' onClick={() => onCopyToClipboardClicked()}></ApiItem>
        </View>
      </View>
    </View>
  )
}
