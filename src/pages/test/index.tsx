import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro';

function TestPage() {

    /** 跳转回首页 */
    function onGobackClicked() {

        Taro.navigateTo({ url: 'pages/index/index' });
    }

    return (
        <View>
            <Text>这是测试页面</Text>
            <Button onClick={() => onGobackClicked()}>跳转回首页</Button>
        </View>
    );
}

export default TestPage;