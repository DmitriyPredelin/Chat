import { message } from 'antd';

export const Message = (setting: any) => {
    let marginTop = setting.marginTop ?? '5vh';
    let marginLeft = setting.marginLeft ?? '65vw';
    let duration = setting.duration ?? 4;

    const success = () => {
        message.success({
            content: setting.text,
            style: {
                marginTop: marginTop,
                marginLeft: marginLeft
            },
            duration: duration
        });
    };

    success();
}