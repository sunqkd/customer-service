import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import createTicket from '@/components/createTicket'
import faq from '@/components/faq'
import faqdetail from '@/components/faqdetail'
import ticketList from '@/components/ticketList'
import historyticketlist from '@/components/historyticketlist'
import ticketDetail from '@/components/ticketDetail'
Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/createTicket',
			name: 'createTicket',
			component: createTicket
		},
		{
			path: '/faq',
			name: 'faq',
			component: faq
		},
		{
			path: '/faqdetail',
			name: 'faqdetail',
			component: faqdetail
		},
		{
			path: '/ticketList',
			name: 'ticketList',
			component: ticketList
		},
		{
			path: '/historyticketlist',
			name: 'historyticketlist',
			component: historyticketlist
		},
		{
			path: '/ticketDetail',
			name: 'ticketDetail',
			component: ticketDetail
		},
		{ 
			path: '*',
			redirect: '/' 
		}
	],
	scrollBehavior (to, from, savedPosition) {
	// return 期望滚动到哪个的位置
		return { x: 0, y: 0 }
	}
})
