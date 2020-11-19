<template>
    <div class="home-index">
        <div class="box">
            <div class="nav-item">
                <template v-if="token!=''">
                    <div>
                        <el-button type="text" v-for="(item,index) in nameoptions" :key="index" :class="{active:index==isActive}" @click="checkedItem(index)">
                            {{item.name}}
                        </el-button>
                    </div>
                    <div @click="()=>{ dialogType='login';showDialog=true }" class="g-ml-50 h-dc ">
                        <img src="../../assets/imgs/login.png" alt="" style="width: 70%;">
                    </div>
                    <div @click="()=>{ dialogType='reg';showDialog=true }"  style="margin-left: -10px;" class="g-ml-20 h-dc ">
                        <img src="../../assets/imgs/reg.png" alt="" style="width: 70%;">
                    </div>
                </template>
                <template v-else>
                    <span>{{ userName }}</span>
                    <el-button type="text" style="margin-left:10px;" @click="goDashboard">
                        Dashboard
                    </el-button>
                    <el-button type="text" style="margin-left:10px;" @click="loginOut">
                        Logout
                    </el-button>
                </template>
            </div>
        </div>
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide>
                <div>
                    <div><img src="../../assets/imgs/05.png" style="max-width: 100%; display: block;margin: 0 auto;"></div>
                    <div class="sbox">
                        <p class="stxt1">You will make a <br>lot more money with us on your side!</p>
                        <img @click="()=>{ dialogType='reg';showDialog=true }" src="../../assets/imgs/reg2.png" style="width: 20%;" class="g-mt-50 h-dc">
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div><img src="../../assets/imgs/05s.png" style="max-width: 100%; display: block;margin: 0 auto;">
                    <div class="sbox  h-dc" style=" text-align: inherit;top: 20px;left: 14%;">
                        <img @click="()=>{ dialogType='reg';showDialog=true }" src="../../assets/imgs/reg2.png" style="width: 20%;padding-top: 60px;" class="g-mt-50 ">
                    </div>
                </div>

            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div v-show="isActive=='0'">
            <div class="box1">
                <p class="title">Our strengths</p>
                <p class="hr"></p>
                <div class="g-mt-15 g-tac">
                    <p class="txt">Ha-Smart ：one-stop dropshipping </p>
                    <p class="txt">solution for your scalable eCommerce business</p>
                </div>
            </div>
            <div class="box2">
                <div class="item">
                    <img src='../../assets/imgs/f1.png'>
                    <span>Fast shipping times</span>
                </div>
                <div class="item">
                    <img src='../../assets/imgs/f2.png'>
                    <span>100% refund or resen</span>
                </div>
                <div class="item">
                    <img src='../../assets/imgs/f3.png'>
                    <span>Super fast processing times</span>
                </div>
                <div class="item">
                    <img src='../../assets/imgs/f4.png'>
                    <span>Source directly from top <br>Chinese manufacturers</span>
                </div>
                <div class="item">
                    <img src='../../assets/imgs/f5.png'>
                    <span>Super fast processing times</span>
                </div>
                <div class="item">
                    <img src='../../assets/imgs/f6.png'>
                    <span>Source directly from top <br>Chinese manufacturers</span>
                </div>
            </div>
            <div @click="()=>{ dialogType='reg';showDialog=true }" class="g-tac ">
                <img src="../../assets/imgs/reg2.png" style="width:337px; height:68px" class="g-mt-50 h-dc">
            </div>
            <div class="g-mt-50 " style="background: #F5F6F9;padding-top: 30px;    padding-bottom: 50px;">
                <p class="title">Why use Ha-Smart?</p>
                <div class="box3 ">
                    <div class="item " style="width:30%">
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;">
                            <img src='../../assets/imgs/s1.png'>
                            <span>All category suppliers</span>
                            <span class="s2">We buy reliable quality products <br> directly from manufacturers.</span>
                        </div>
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;">
                            <img src='../../assets/imgs/s2.png'>
                            <span>Professional team</span>
                            <span class="s2">24-48 hours real time<br> order processing</span>
                        </div>
                    </div>
                    <div class="item" style="width:30%">
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;">
                            <img src='../../assets/imgs/s3.png'>
                            <span>Overseas warehouse</span>
                            <span class="s2">Excellent warehousing services<br> are ready for you</span>
                        </div>
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;">
                            <img src='../../assets/imgs/s4.png'>
                            <span>Customized service</span>
                            <span class="s2"> Create custom packaging for all<br>of your products</span>
                        </div>
                    </div>
                </div>
                <div @click="()=>{ dialogType='reg';showDialog=true }" class="g-tac " style="margin-top: -50px;">
                    <img src="../../assets/imgs/reg2.png" style="width:337px; height:68px" class=" h-dc">
                </div>
            </div>
            <img src="../../assets/imgs/11.png" style=" position: relative; top: 410px;width: 83%;left: 101px;margin-top: -354px;">
            <div>
                <p class="title" style="padding-top: 10px;">How does it work?</p>
                <div class="box4" style="margin-top:10px">
                    <div class="item">
                    <img src='../../assets/imgs/w1.png'>
                        <span style="color:#1E88F5;line-height: 20px">Link <br>store</span>
                    </div>
                    <div class="item">
                        <div class="bgi"><img src='../../assets/imgs/w2.png'></div>
                        <span>Receive order</span>
                    </div>
                    <div class="item">
                        <div class="bgi"><img src='../../assets/imgs/w3.png'></div>
                        <span>Processing order</span>
                    </div>
                    <div class="item">
                        <div class="bgi"><img src='../../assets/imgs/w4.png'></div>
                        <span>Purchase from the factory</span>
                    </div>
                    <div class="item">
                    <div class="bgi"> <img src='../../assets/imgs/w5.png'></div>
                        <span>Quality Control</span>
                    </div>
                    <div class="item" style="flex-direction: column;">
                        <div class="bgi"><img src='../../assets/imgs/w6.png'></div>
                        <span>Ship by fast line</span>
                    </div>
                    <div class="item" style="flex-direction: column;">
                    <div class="bgi"> <img src='../../assets/imgs/w7.png'></div>
                        <span>Full logistics tracking</span>
                    </div>
                    <div class="item" style="flex-direction: column;">
                        <div class="bgi"><img src='../../assets/imgs/w8.png'></div>
                        <span>Customer sign</span>
                    </div>
                    <div class="item" style="flex-direction: column;">
                        <div class="bgi"><img src='../../assets/imgs/w9.png'></div>
                        <span>After-sale warranty</span>
                    </div>
                    <div class="item g-tac" style="flex-direction: column;">
                        <img src='../../assets/imgs/w10.png'>
                        <span style="color:#1E88F5;line-height: 20px">100% resend <br> or refund</span>
                    </div>
                </div>
            </div>
            <div @click="()=>{ dialogType='reg';showDialog=true }" class="g-tac ">
                <img src="../../assets/imgs/reg2.png" style="width:337px; height:68px" class="g-mt-50 h-dc">
            </div>
            <div class="box1" style="background: #F5F6F9;padding-top: 30px;    padding-bottom: 50px;">
                <p class="title">Customer evaluation</p>
                <p class="hr"></p>
                <div class="g-mt-15 g-tac">
                    <p class="txt">We gives you all the solutions to </p>
                    <p class="txt">drive growth for your E-Commerce business</p>
                    <p class="txt">at every stage.</p>
                </div>
                <div class="g-mt-30 ">
                    <div class="box3 ">
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;width:30% ;      margin-right: 40px;">
                            <img src='../../assets/imgs/p1.png'>
                            <span class="g-pt-10 ">Joris Aerts</span>
                            <img class="g-pt-10 " src='../../assets/imgs/xx.png' style="width:60%">
                            <span class="g-pt-10 " style="  color:#91A0A8 ;   line-height: 20px; font-size: 12px; margin-top: 20px;">I used this app to add great products to my store. It is very easy to use and add. I would love to have an even bigger choice as I would use only this app. The free worldwide shipping is something I never expected and cannot wait to use my logo on the packages and the best is the app is always free.</span>

                        </div>
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;width:30% ;   ">
                            <img src='../../assets/imgs/p2.png'>
                            <span class="g-pt-10 ">Joris Aerts</span>
                            <img class="g-pt-10 " src='../../assets/imgs/xx.png' style="width:60%">
                            <span class="g-pt-10 " style=" color:#91A0A8 ;  line-height: 20px; font-size: 12px; margin-top: 20px;">I used this app to add great products to my store. It is very easy to use and add. I would love to have an even bigger choice as I would use only this app. The free worldwide shipping is something I never expected and cannot wait to use my logo on the packages and the best is the app is always free.</span>
                        </div>
                    </div>
                    <div @click="()=>{ dialogType='reg';showDialog=true }" class="g-tac ">
                        <img src="../../assets/imgs/reg2.png" style="width:337px; height:68px" class=" h-dc">
                    </div>
                </div>
            </div>
        </div>
        <div  v-show="isActive=='1'">
            <div class="box1">
                <p class="title">BLOG</p>
                <p class="title2">Find out more details about how to use the sourcinbox service.</p>
                <div>
                    <input class="sinp"  v-model="search" placeholder="Looking for something…" >
                    <div style="position: relative; top: -42px;left: 540px;width: 44px; height: 44px;"  @click="getList()" class="h-dc"> 
                        <img src='../../assets/imgs/more.png' style="width:80%">
                    </div>
                </div>
                <div class="list">
                    <div class="item2" style="margin-left: 100px;">
                        <img src='../../assets/imgs/t1.png' style="width:70%">
                    <div class="g-pl-15" style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                    <div class="item2" style="    margin-left: -90px;">
                        <img src='../../assets/imgs/t2.png' style="width:70%">
                    <div class="g-pl-15"  style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                    <div class="item2" style="    margin-left: -90px;">
                        <img src='../../assets/imgs/t3.png' style="width:70%">
                    <div class="g-pl-15"  style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                </div>
                <div class="list">
                    <div class="item2" style="margin-left: 100px;">
                        <img src='../../assets/imgs/t1.png' style="width:70%">
                    <div class="g-pl-15" style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                    <div class="item2" style="    margin-left: -90px;">
                        <img src='../../assets/imgs/t2.png' style="width:70%">
                    <div class="g-pl-15"  style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                    <div class="item2" style="    margin-left: -90px;">
                        <img src='../../assets/imgs/t3.png' style="width:70%">
                    <div class="g-pl-15"  style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                </div>
                <div class="list">
                    <div class="item2" style="margin-left: 100px;">
                        <img src='../../assets/imgs/t1.png' style="width:70%">
                    <div class="g-pl-15" style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                    <div class="item2" style="    margin-left: -90px;">
                        <img src='../../assets/imgs/t2.png' style="width:70%">
                    <div class="g-pl-15"  style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                    <div class="item2" style="    margin-left: -90px;">
                        <img src='../../assets/imgs/t3.png' style="width:70%">
                    <div class="g-pl-15"  style="width: 77%;"> 
                            <p class="c91 g-pt-10"><span>By：Miva</span>&nbsp;&nbsp;<span>22/07/2020</span></p>
                            <p class="itxt">5 Essential Things You Need to Know Before Starting Your Online Business</p>
                            <p class="c91 g-pt-10">Launching an ecommerce business requires careful research···</p>
                    </div>
                    </div>
                </div>
            </div>
            <div style="margin-bottom:100px"></div>
        </div>
        <div  v-show="isActive=='2'">
            <div class="g-mt-50 " style="background: #F5F6F9;padding-top: 30px;    padding-bottom: 50px;">
                <div class="box3 ">
                    <div class="item " style="width:30%">
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;">
                            <img src='../../assets/imgs/su1.png'>
                            <span class="sutxt">24/7 customer support</span>
                            <span class="s2">Skype online communication, promptly handle any problems with your order</span>
                        </div>
                    </div>
                    <div class="item" style="width:30%">
                        <div class="item" style="border-radius: 10px;background: #FFFFFF;">
                            <img src='../../assets/imgs/su2.png'>
                            <span class="sutxt">Professional after-sales team</span>
                            <span class="s2">100% refund or resend policy</span>
                        </div>
                    </div>
                </div>
                <p class="title">FAQ</p>
                 <div  class="faq" style="width:80%;margin: 50px auto;"> 
                   <el-collapse v-model="activeNames" >
                    <el-collapse-item title="Why we're better tha" name="1">
                        <div>When ordering through AliExpress, you’re dealing with layers and layers of middlemen, causing very high pricing and leaving you with very little profit margins to work with. Along with that, AliExpress suppliers often take 5-10 days just to process your orders. We deals directly with suppliers and manufacturers to get you the best rates possible, leaving you with plenty of margins to work with, and we can process orders within 1-2 days to ensure the absolute fastest shipping times.</div>
                    </el-collapse-item>
                    <el-collapse-item title="How long do you need to process my orders?" name="2">
                        <div>When ordering through AliExpress, you’re dealing with layers and layers of middlemen, causing very high pricing and leaving you with very little profit margins to work with. Along with that, AliExpress suppliers often take 5-10 days just to process your orders. We deals directly with suppliers and manufacturers to get you the best rates possible, leaving you with plenty of margins to work with, and we can process orders within 1-2 days to ensure the absolute fastest shipping times.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Can I test products before I sell them on my store?" name="3">
                         <div>When ordering through AliExpress, you’re dealing with layers and layers of middlemen, causing very high pricing and leaving you with very little profit margins to work with. Along with that, AliExpress suppliers often take 5-10 days just to process your orders. We deals directly with suppliers and manufacturers to get you the best rates possible, leaving you with plenty of margins to work with, and we can process orders within 1-2 days to ensure the absolute fastest shipping times.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Can you do branding and customized package?" name="4">
                        <div>When ordering through AliExpress, you’re dealing with layers and layers of middlemen, causing very high pricing and leaving you with very little profit margins to work with. Along with that, AliExpress suppliers often take 5-10 days just to process your orders. We deals directly with suppliers and manufacturers to get you the best rates possible, leaving you with plenty of margins to work with, and we can process orders within 1-2 days to ensure the absolute fastest shipping times.</div>
                    </el-collapse-item>
                     <el-collapse-item title="Which courier do you?" name="5">
                        <div>When ordering through AliExpress, you’re dealing with layers and layers of middlemen, causing very high pricing and leaving you with very little profit margins to work with. Along with that, AliExpress suppliers often take 5-10 days just to process your orders. We deals directly with suppliers and manufacturers to get you the best rates possible, leaving you with plenty of margins to work with, and we can process orders within 1-2 days to ensure the absolute fastest shipping times.</div>
                    </el-collapse-item>
                    <el-collapse-item title="Do I have to buy inventory ahead of time?" name="6">
                        <div>When ordering through AliExpress, you’re dealing with layers and layers of middlemen, causing very high pricing and leaving you with very little profit margins to work with. Along with that, AliExpress suppliers often take 5-10 days just to process your orders. We deals directly with suppliers and manufacturers to get you the best rates possible, leaving you with plenty of margins to work with, and we can process orders within 1-2 days to ensure the absolute fastest shipping times.</div>
                    </el-collapse-item>
                </el-collapse>
               </div>
                <div class="g-mt-50 ">
                     <p class="title">Ready to get started ?</p>
                </div>
                <div @click="()=>{ dialogType='reg';showDialog=true }" class="g-tac g-mt-50 g-pb-50" >
                    <img src="../../assets/imgs/reg2.png" style="width:337px; height:68px" class=" h-dc">
                </div>
            </div>     
          
        </div>
        <div class="footer" style="padding:0px">
            <div class="first">
                <div class="fir-left">
                    <div class="ha">
                        Ha-Smart
                    </div>
                    <div @click="goUrl()"  class="button h-dc">Alliance marketing</div>
                </div>
                <div class="fir-right">
                    <div class="li">
                        <div>Privacy Policy</div>
                        <div>Terms & Conditions</div>
                        <div>Contact Us</div>
                    </div>
                    
                </div>
            </div>
            <div class="second">
                © 2019-2020, www.Ha-Smart.com
            </div>
        </div>
        <el-dialog :visible.sync="showDialog" width="1200" :title="dialogType === 'reg' ? 'Sign up' : 'Log in'" :close-on-click-modal="false" class="user-dialog" @close="onClose">
            <div class="content">
                <div class="con-left">
                    <el-form ref="form" :model="form" label-width="80px" :rules="rules" label-position="left" hide-required-asterisk style="width:80%;margin:auto;">
                        <el-form-item v-if="['reg','forgetPwd'].includes(dialogType)" prop="email" label="Email:">
                            <el-input v-model.trim="form.email" clearable placeholder="Please enter email"></el-input>
                        </el-form-item>
                        <template v-if="dialogType !== 'forgetPwd'">
                            <el-form-item label="Account:" prop="userName">
                                <el-input v-model.trim="form.userName" clearable placeholder="Please enter account"></el-input>
                            </el-form-item>
                            <el-form-item label="Password:" prop="password" >
                                <el-input v-model.trim="form.password" clearable type="password" placeholder="6-20 characters are case sensitive"></el-input>
                            </el-form-item>
                            <div v-if="dialogType === 'login'" style="text-align:right;">
                                <a href="javascript:;" @click="dialogType='forgetPwd'">forget password</a>
                            </div>
                            <el-form-item v-if="dialogType === 'reg'" label-width="80px" label="Confirm password:" prop="confirmPwd">
                                <el-input v-model.trim="form.confirmPwd" clearable type="password" placeholder="6-20 characters are case sensitive"></el-input>
                            </el-form-item>
                        </template>
                    </el-form>

                    <div style="text-align:center">
                        <el-button v-if="dialogType==='forgetPwd'" type="primary" :loading="sendLoading" @click="sendPwd">
                            Send Password
                        </el-button>
                        <el-button v-else type="primary" @click="onSubmit">
                            {{ dialogType === 'reg' ? 'Sign up for free' : 'Log in' }}
                        </el-button>
                        <div style="margin-top:30px;font-size:14px;">
                            <p v-if="dialogType === 'login'">
                                Not have an account， <a href="javascript:;" @click="dialogType='reg'" style="color:#333">please register</a>
                            </p>
                            <p v-else>
                                Have an account，<a href="javascript:;" @click="dialogType='login'" style="color:#333">Please log in</a>
                            </p>
                        </div>

                    </div>
                </div>

                <div class="con_right">
                    <img src="../../assets/imgs/06.png" alt="">
                    <span>Ha-Smart</span>
                </div>
            </div>

        </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
     return {
            activeNames: ['1'],
            search:'',
            token:'',
            showDialog: false,
            dialogType: 'reg', //reg or login or forgetPwd,
            isAgree: false,
            isActive: 0,
            swiperOptions: {
               autoplay : {
                delay:5000
              },
                slidesPerView: 1, // 显示的数量
                spaceBetween: 30, // 每张的间距
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            nameoptions: [{
                    'name': 'HOME'
                },
                {
                    'name': 'BLOG'
                },
                {
                    'name': 'SUPPORT'
                },

            ],
            form: {
                userName: '',
                email: '',
                password: '',
                confirmPwd: ''
            },
            rules: {
                userName: [{
                        required: true,
                        message: 'name cannot be empty'
                    },
                    {
                        validator: (rule, value, ck) => {

                            if (!/^[^\u4e00-\u9fa5]+$/.test(value)) {

                                ck(new Error('Smart input English'))
                                return false;
                            }
                            ck();

                        }
                    }
                ],
                email: [{
                        required: true,
                        message: 'e-mail cannot be empty'
                    },
                    {
                        validator: (rule, value, ck) => {

                            if (!/@/.test(value)) {
                                return ck(new Error('E-mail format error'));
                            }
                            ck();

                        }
                    }
                ],

                password: [{
                        required: true,
                        message: 'password cannot be empty'
                    },
                    {
                        validator: (rule, value, ck) => {

                            if (value.length < 6 || value.length > 20) {

                                return ck(new Error('password length 6-20 characters'))

                            }
                            ck();
                        }
                    }
                ],
                confirmPwd: [{
                        required: true,
                        message: 'confirm password format error'
                    },
                    {
                        validator: (rule, value, ck) => {

                            if (value.length < 6 || value.length > 20) {

                                return ck(new Error('password length 6-20 characters'))

                            }
                            if (value !== this.form.password) {

                                return ck(new Error('the two passwords are inconsistent'))
                            }
                            ck();
                        }
                    }
                ],

            },
            userName: '',
            sendLoading: false
        }
    },
    created() {
        this.userName = localStorage.getItem('username');
        this.token = sessionStorage.access_token 
        if (this.$route.query.login) {
            this.showDialog = true;
        }
    },
    methods: {
      checkedItem(index) {
        this.isActive = index;
      },
      goUrl(){
          let routerJump = this.$router.resolve('/alliance_marketing')
          window.open(routerJump.href, '_blank');
        //   this.$router.push()
      },
      getList(){

      },
      onSubmit() {
            this.$refs['form'].validate((valid) => {
               if(valid){
                 let url = this.dialogType === 'reg' ? 'reg' : 'login';
                 this.getHttpPost(this.form,url,false,'post').then(res => {
                    if(res.status==200){
                        if(url=='reg'){
                            this.$message.success('Sign up success');
                            this.dialogType = 'login';
                            return false;
                        }else{
                             this.$message({
                                message: 'Login success',
                                type: 'success'
                            });
                            sessionStorage.access_token = res.token
                            sessionStorage.token_type = res.retailerInfo.userName
                            this.$router.push({path: '/'});
                        }
                    }else{
                            if(url=='reg'){
                                this.$message.error('Sign up error');
                            }else{
                                this.$message.error('Login error');
                            }
                        }
                    },
                    error => { 
                        this.$message.error('There is a problem with the network');
                        console.log(error); 
                    })
               }
            });
      },
      sendPwd(){
            this.$refs['form'].validate((valid) => {
               if(valid){
                 this.getHttpPost({ 'email': this.form.email},'forgetPassword',false,'post').then(res => {
                        if(res.status==200){
                            this.sendLoading = false;
                            this.showDialog = false;
                            this.$message.success('Please check your mailbox');
                        }else{
                            this.sendLoading = false;
                            this.$message.error('Send e-mail faild');                        }
                    },
                    error => { 
                        this.$message.error('There is a problem with the network');
                        console.log(error); 
                    })
               }
            });
      },
      loginOut() {
            this.$confirm('Confirm to log out of the system?', 'Tips', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                })
                .then(() => {
                    localStorage.clear();
                    this.userName = '';
                    this.$message.success('logout success');
                })
                .catch(() => {});
      },
      onClose() {
         this.$refs['form'].resetFields();
        }
    }
  }
</script>

<style lang="less" scoped>
 .home-index {
     .faq /deep/ .el-collapse-item__header{
        padding-left: 15px;
     }
     .faq /deep/ .el-collapse-item__content{
         padding-left: 15px;
         color: #91A0A8;
     }
     .faq /deep/ .el-collapse-item{
         margin-bottom: 10px;
     }
     .list{
        display: flex;
        flex-wrap: wrap;
        margin: 0;
     }
     .itxt{
        font-weight: 600;
        color: #0D253E;
        line-height: 20px;
        padding-top: 5px;
     }
     .item2{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33%;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 14px;
      
     }
   .sbox {
      position: relative;
      top: -48px;
      left: -2%;
      margin-top: -239px;
      text-align: center;
    }
  .bgi{
        border-radius: 50%;
        background: #F4F8FC;
        padding: 20px;
        z-index: 2;
    }
    .sinp{
        width: 600px;
        height: 50px;
        background: #FFFFFF;
        border-radius: 47px;
        padding-left: 20px;
        margin-top: 20px;
        border: solid #CEC7FF;
     }
    .title2{     
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #0D253E;
        padding-top: 20px;
        line-height: 33px;
    }
    .title {
        font-size: 38px;
        font-family: Tahoma-Bold, Tahoma;
        font-weight: bold;
        color: #0D253E;
        line-height: 46px;
        text-align: center;
    }

    .stxt1 {
        color: #fff;
        line-height: 30px;
        font-size: 24px;
        line-height: 40px;
    }
    .blog{
        font-size: 36px;
        font-family: Tahoma-Bold, Tahoma;
        font-weight: bold;
        color: #0D253E;
        text-align: center;
        padding-top: 140px;
    }

    .nav-item {
        display: flex;
        height: 42px;
        align-items: center;

       /deep/ .el-button  span {
            font-family: Tahoma-Bold, Tahoma;
            color: #0D253E;
        }

        button:nth-child(4) {
            width: 144px;
            border: 2px solid #FFFFFF;
            text-align: center;

        }

        button:nth-child(5) {
            width: 167px;
            background: linear-gradient(135deg, #916BFF 0%, #3366FF 98%);
            border-radius: 4px;
            text-align: center;
        }

        .active {
            font-size: 20px;
            // padding-top: -50px;
        }
    }

    .body-main {
        min-height: calc(100vh - 120px);
        background-color: #f2f2f2;
    }

    .box {
         position: relative;
        top: 67px;
        z-index: 2;
        width: 50%;
        right: -48%;
        margin-top: -42px;
    }

    .box1 {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: 80px;

        .hr {
            width: 117px;
            color: #91A0A8;
            border-bottom: solid 3px;
            margin-top: 10px;
        }

        .txt {
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #91A0A8;
            line-height: 28px;

        }

    }

    .box2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0;

        span {
            font-weight: 500;
            color: #0D253E;
            line-height: 40px;
            font-family: PingFangSC-Medium, PingFang SC;
        }

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35%;
            font-size: 14px;
            padding-top: 15px;
            padding-bottom: 15px;
        }
    }

    .box3 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 30px;

        span {
            font-weight: 500;
            color: #0D253E;
            text-align: center;
            ;
            line-height: 40px;
            font-family: PingFangSC-Medium, PingFang SC;
        }
        .sutxt{
            font-weight: 600;
            color: #0D253E;
         }

        .s2 {
            color: #91A0A8;
            line-height: 15px;
            text-align: center;
            ;
            font-size: 11px;
        }

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85%;
            margin-bottom: 45px;
            flex-direction: column;
            font-size: 14px;
            padding-top: 15px;
            padding-bottom: 15px;
        }
    }

    .box4 {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 50px;

        span {
            font-weight: 500;
            color: #0D253E;
            line-height: 40px;
            font-family: PingFangSC-Medium, PingFang SC;
        }

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 17%;
            flex-direction: column-reverse;
            font-size: 14px;
            padding-top: 15px;
            padding-bottom: 15px;
        }
    }

    .el-header {
        position: sticky;
        top: 0;
        z-index: 2000;
    }

    .el-footer {
        background-color: #000;
        color: #fff;
    }

    .nav {
        background: url('../../assets/imgs/05.png') no-repeat top;
        background-size: 100% 100%;
        height: 684px;
        padding: 0 20px;
        display: flex;
        flex-direction: row-reverse;
        padding-top: 50px;
        padding-right: 221px;
        font-size: 18px;
        box-sizing: border-box;

        .name {
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 2px;
        }

        .el-button--text {
            margin-left: 60px;
            color: #FFFFFF;
        }

    }

    .el-footer {
        line-height: 60px;
        text-align: center;
        font-size: 14px;
    }

    .user-dialog>div {
        background-color: rgba(242, 242, 242, 1);
    }

    .banner1 {

        // width: 100%;
        // height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .footer {
        .first {
            width: 100%;
            height: 250px;
            background-color: #343647;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 110px;
            padding-right: 138px;
            box-sizing: border-box;
            padding-top: 15px;

            .fir-left {
                display: flex;
                align-items: center;
                flex-direction: column;

                .ha {
                    font-size: 60px;
                }

                .button {
                      width: 270px;
                      height: 62px;
                      background: linear-gradient(135deg, #916BFF 0%, #3366FF 98%);
                      border-radius: 4px;
                      text-align: center;
                      line-height: 62px;
                      margin-top: 20px;
                }
            }

            .fir-right {
                display: flex;

                .li {
                       line-height: 50px;
                       margin-right: 20px
                }

                .li-img {
                   

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .second {
              width: 100%;
              height: 60px;
              background-color: #292D3A;
              color: #fff;
              line-height: 60px;
              text-align: center;
              font-size: 16px;
        }
    }

    .content {
        display: flex;
        justify-content: space-between;

        .con_right {
            width: 660px;
            height: 500px;
            background: linear-gradient(135deg, #916BFF 0%, #3366FF 98%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 32px;

            span {
                margin-top: 20px;
            }
        }

        .con-left {
            width: 560px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>
