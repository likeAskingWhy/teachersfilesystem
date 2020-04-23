import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Teacher from '../components/teachers/Teacher'
import Personalinfor from '../components/teachers/Personalinfor'
import Alterpassword from '../components/teachers/Alterpassword'
import Basicfileinfor from '../components/teachers/Basicfileinfor'
import Teachflieinfor from '../components/teachers/Teachflieinfor'
import Researchfileinfor from '../components/teachers/Researchfileinfor'
import Learnfileinfor from '../components/teachers/Learnfileinfor'

import Admin from '../components/admins/Admin'
import Personalinforadm from '../components/admins/Personalinforadm'
import Alterpasswordadm from '../components/admins/Alterpasswordadm'
import Teacherfileinforadm from '../components/admins/Teacherfileinforadm'
import Systemsettings from '../components/admins/Systemsettings'
import Teacherfiledetails from '../components/admins/Teacherfiledetails'
import Teacherfilenewinfor from '../components/admins/Teacherfilenewinfor'
import Teacherfilerecylebin from '../components/admins/Teacherfilerecylebin'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
		{ path: '/login', component: Login },
		{ 
			path: '/teacher',
			component: Teacher,
			children: [
				{ path: '/', redirect: '/teacher/personalinfor/1' },
				{ path: 'personalinfor', component: Personalinfor },
				{ path: 'alterpassword', component: Alterpassword },
				{ path: 'basicfileinfor', component: Basicfileinfor },
				{ path: 'teachflieinfor', component: Teachflieinfor },
				{ path: 'researchfileinfor', component: Researchfileinfor },
				{ path: 'learnfileinfor', component: Learnfileinfor },
			]
		},
		{
			path: '/admin',
			component: Admin,
			children: [
				{ path: '/', redirect: '/admin/personalinforadm' },
				{ path: 'personalinforadm', component: Personalinforadm },
				{ path: 'alterpasswordadm', component: Alterpasswordadm },
				{ path: 'teacherfileinforadm', component: Teacherfileinforadm },
				{ path: 'systemsettings', component: Systemsettings },
				{ path: 'teacherfiledetails/:id', component: Teacherfiledetails },
				{ path: 'teacherfilenewinfor', component: Teacherfilenewinfor },
				{ path: 'teacherfilerecylebin', component: Teacherfilerecylebin }
			]
		}
  ]
})
