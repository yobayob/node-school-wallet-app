import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components'
import {CardAction} from '../agent'
import {Button, Input, Title} from './';

const CardLayout: any = styled.div`
	position: relative;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
	margin-bottom: ${({isSingle}: any) => (isSingle ? 0 : '15px')};
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({bgColor, active}: any) => (active ? bgColor : 'rgba(255, 255, 255, 0.1)')};
`;
const NotificationMessage: any = styled.div`
    color: #b3b1b1;
	position: absolute;
    font-size: 1.5em;
    font-weight: 600;
    text-align: center;
`;
const NotificationSuccess: any = styled(CardLayout)`
	background-color: transparent;
	background-image: url(/assets/round-check.svg);
	background-repeat: no-repeat;
	background-position: center;
	box-sizing: border-box;
	border: 2px dashed rgba(255, 255, 255, 0.2);
`;
const NotificationError: any = styled(CardLayout)`
	position: absolute;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
    background:lightred;
    color:#fff;
`;
const NewCardLayout: any = styled(CardLayout)`
	background-color: transparent;
	background-image: url('/assets/cards-add.svg');
	background-repeat: no-repeat;
	background-position: center;
	box-sizing: border-box;
	border: 2px dashed rgba(255, 255, 255, 0.2);
`;
const ModalContent: any = styled.div`
    position: relative;
`;
const ModalTitle: any = styled(Title)`
	color: #b3b1b1;
	position: absolute;
    text-align: center;
`;
const InputField: any = styled.div`
	display: flex;
	align-items: center;
`;

const Label: any = styled.label`
	font-size: 15px;
	color: dimgray;
	width: 90%;
`;
const Currency: any = styled.span`
	font-size: 13px;
	color: dimgray;
	margin-left: 12px;
`;
const InputCardNumber: any = styled(Input)`
	width: 3.8em;
    margin: .2em .2em 1em .2em;
`;

const InputBalance: any = styled(Input)`
	width: 3em;
`;
const ButtonClose: any = styled(Button)`
	text-align: center;
	margin: .5em;
`;
const ButtonSuccess: any = styled(Button)`
	text-align: center;
	margin: .4em;
`;
const FormContent: any = styled.div`
	padding-top: 3em;
`;

interface ICardAdd {
    onAddCardSuccess?: any
}
interface IState {
    modalIsOpen?: any
    cardNumber?: any
    balance?: any
    stage?: any
}
class CardAdd extends React.Component<ICardAdd, IState> {
    static propTypes = {
        onAddCardSuccess: PropTypes.func.isRequired
    };
    /**
     * Конструктор
     *
     * @param {Object} props свойства компонента
     */
    constructor(props: ICardAdd) {
        super(props);
        this.state = {
            modalIsOpen: 0,
            cardNumber: "",
            balance: "0",
            stage: ""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal() {
        return this.setState({modalIsOpen: 1});
    }

    closeModal() {
        return this.setState({modalIsOpen: 0});
    }
    onBlurInput(event: any) {
        if (!event) {
            return;
        }

        const {value} = event.target;

        this.setState({
            cardNumber: this.state.cardNumber + value
        });
    }
    notification(value: any){
        this.setState({
            stage: value
        });
    }
    onSubmitForm(event: any) {
        if (event) {
            event.preventDefault();
        }
        const {cardNumber, balance}: any = this.state;
        CardAction.addCard({
            balance: Number(balance),
            cardNumber: cardNumber
        }).then(data => {
            this.closeModal();
            this.notification("success");
            this.props.onAddCardSuccess(data);
            console.log('Карта успешно создана');
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if(this.state.modalIsOpen === 0){
            if(this.state.stage === "error") {
                return (
                    <NotificationError>
                        <NotificationMessage>
                            Ошибка добавления новой карты!
                        </NotificationMessage>
                    </NotificationError>
                );
            } else if(this.state.stage === "success") {
                return (
                    <NotificationSuccess>
                        <NotificationMessage>
                            Карта успешно создана!
                        </NotificationMessage>
                    </NotificationSuccess>
                );
            } else {
                return (
                    <NewCardLayout
                        onClick={this.openModal}
                    />
                );
            }
        } else {
            return (
                <ModalContent>
                    <ModalTitle>Новая карта</ModalTitle>
                    <FormContent>
                        <form onSubmit={(event) => this.onSubmitForm(event)}>
                            <InputField>
                                <InputCardNumber
                                    onBlur={(event: any) => this.onBlurInput(event)}
                                    placeholder="0000"
                                    name="cardNumber"/>
                                <InputCardNumber
                                    onBlur={(event: any) => this.onBlurInput(event)}
                                    placeholder="0000"
                                    name="cardNumber"/>
                                <InputCardNumber
                                    onBlur={(event: any) => this.onBlurInput(event)}
                                    placeholder="0000"
                                    name="cardNumber"/>
                                <InputCardNumber
                                    onBlur={(event: any) => this.onBlurInput(event)}
                                    placeholder="0000"
                                    name="cardNumber"/>
                            </InputField>
                            <ButtonSuccess bgColor='#108051' textColor='#fff'>Создать</ButtonSuccess>
                            <ButtonClose
                                bgColor='#c22f24' textColor='#fff' onClick={this.closeModal}
                                type="reset">Закрыть</ButtonClose>
                        </form>
                    </FormContent>
                </ModalContent>
            );
        }
    }
}
export default CardAdd;


