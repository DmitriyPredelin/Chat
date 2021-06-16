import { Button, Input, Radio, Switch } from "antd"
import moment from 'moment';


export const ModalWindow = (props: any) => {
    const { TextArea } = Input;

    let choiceDate = ''
    if (props.selectedDay) {
        choiceDate = moment(props.selectedDay).locale("ru").format("LL");
    }

 
    const onChange = () => {

    }
  


    return (
        <div className={props.visible ? "modal visible" : "modal"} onClick={() => props.setVisible(false)}>
            <div className={props.visible ? "modal__content visible" : "modal__content"} onClick={e => e.stopPropagation()}>
                <div className="modal__form">
                    <h2>{choiceDate}</h2>
                    <TextArea placeholder="Введите ваше дело" showCount maxLength={100} onChange={onChange} />

                    <div>Приоритет:</div>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">Низкий</Radio.Button>
                        <Radio.Button value="b">Средний</Radio.Button>
                        <Radio.Button value="c">Высокий</Radio.Button>
                    </Radio.Group>

                    <div>Напоминание в Telegram</div>
                    <Switch defaultChecked onChange={onChange} />
                    <div>
                        <Button>Создать напоминание</Button>
                        <Button>Отмена</Button>
                    </div>

                </div>

            </div>
        </div>
    )
}