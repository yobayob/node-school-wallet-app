// Order is very important
import App from './App';
import Select from './Select';
import Card from './Card';
import CardEdit from './CardEdit'
import CardDelete from './CardDelete';
import Title from './Title';
import UserInfo from './UserInfo';
import Header from './Header';
import Button from './Button';
import CardsBar from './CardsBar';
import Island from './Island';
import History from './History';
import Input from './Input';
import MobilePaymentSuccess from './MobilePaymentSuccess';
import MobilePaymentContract from './MobilePaymentContract';
import MobilePayment from './MobilePayment';
import Prepaid from './Prepaid';
import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';
import Withdraw from './Withdraw';

// TODO: fix this sheeeet
export interface IMobilePayment {
	activeCardIndex?: any
	stage?: any
	activeCard?: any
	transaction?: any
	inactiveCardsList?: any
	onPaymentSuccess?: any
	repeatPayment?: any
	sum?: any
	bgColor?: any
}

export {
	App, Card, CardEdit, CardDelete, Input, Select, CardsBar, Button, Title, Header,
	UserInfo, Island, History,
	MobilePaymentSuccess, MobilePaymentContract, MobilePayment,
	Prepaid, PrepaidContract, PrepaidSuccess,
	Withdraw,
}
