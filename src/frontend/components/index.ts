import App from './App';
import Card from './Card';
import Select from './Select';
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

export interface IMobilePayment {
	activeCardIndex?: any,
	stage?: string
	activeCard?: any
	transaction?: any
	inactiveCardsList?: any
	onPaymentSuccess?: any
	repeatPayment?: any
	sum?: any
	bgColor?: any
}

export {
	App, Card, Input, Select, CardsBar, Button, Title, Header,
	UserInfo, Island, History,
	MobilePaymentSuccess, MobilePaymentContract, MobilePayment,
	Prepaid, PrepaidContract, PrepaidSuccess,
	Withdraw,
}
