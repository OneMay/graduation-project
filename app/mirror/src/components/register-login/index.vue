<template>
    <div class="registerBG">
        
        <Modal v-model="modal" width="600" class-name="vertical-center-modal" :closable="false">
        <p slot="header" style="color:#f60;text-align:center">
        </p>
        <Row :gutter="32">
            <Col span="24" class="demo-tabs-style1">
                <Tabs>
                    <TabPane label="登录">
                        <Form ref="Login" :model="Login" :rules="ruleInline" class="signin" style="margin-top:30px">
                            <FormItem prop="mobile">
                                <Input type="text" v-model="Login.mobile" placeholder="输入手机号" @focus="errorUnshow">
                                    <Icon type="ios-call" slot="prepend"></Icon>
                                    
                                </Input>
                                <p class="error-text" v-show="Login.error.mobile">{{Login.error.mobile}}</p>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="Login.password" placeholder="输入密码" @focus="errorUnshow">
                                    <Icon type="md-lock" slot="prepend"></Icon>
                                </Input>
                                <p class="error-text" v-show="Login.error.password">{{Login.error.password}}</p>
                            </FormItem>
                            <FormItem style="text-align:center">
                                <p class="error-text" v-show="Login.error.all">{{Login.error.all}}</p>
                                <Button type="primary" @click="loginSubmit('Login')" style="width:60%;font-size:16px">登录</Button>
                            </FormItem>
                        </Form>

                        <!--<ul class="form other-form flexa">
                            <li>
                                <h5>使用第三方帐号登录</h5>
                            </li>
                            <li class="other-login">
                                <a class="qq" href="http://shop.1234.com:8001/login/qq/"><img src="./img/qq.png" alt="" class="qqwximg"></a>
                                <a class="sina" href="http://shop.1234.com:8001/login/weibo/"><img src="./img/zfb.png" alt="" class="qqwximg"></a>
                                <a class="weixin" href="http://shop.1234.com:8001/login/weixin/"><img src="./img/wx.png" alt="" class="qqwximg"></a>
                            </li>
                        </ul>!-->
                    </TabPane>
                    <TabPane label="注册">
                        <Form ref="Register" :model="Register" :rules="ruleInline" class="signup" style="margin-top:30px">
                            <FormItem prop="mobile">
                                <Input type="text" v-model="Register.mobile" placeholder="输入手机号" style="text-align:center">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                                <p class="error-text marb8" v-show="Register.error.mobile">{{Register.error.mobile}}</p>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="Register.password" placeholder="输入密码">
                                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                                <p class="error-text marb8" v-show="Register.error.password">{{Register.error.password}}</p>
                            </FormItem>
                            <FormItem style="text-align:center">
                                <p class="error-text marb8" v-show="Register.error.error">{{Register.error.error}}</p>
                                <Button type="primary" @click="registerSubmit('Register')" style="width:60%;font-size:16px">注册</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <div slot="footer" style="text-align:center">
                <p></p>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
             modal: true,
             Login:{
                 mobile:'',
                 password:'',
                 error:{
                     mobile:'',
                     password:'',
                     all:''
                 }

             },
             Register:{
                 mobile:'',
                 password:'',
                 error:{
                     mobile:'',
                     password:'',
                     error:''
                 }
             },
             ruleInline: {
                //     Loginmobile: [
                //         { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                //         { type: 'number', min: 11,max:11, message: 'The password length  be 11 bits', trigger: 'blur' }
                //     ],
                //    Login.password: [
                //         { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                //         { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                //     ]
                }
        }
  },
  methods: {
            loginSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            errorUnshow(){

            }
    }
}
</script>
<style lang="less">
// /这里加上scoped就不起作用/
    .ivu-tabs-nav {
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    }
    // /手机端模态框/
    .qqwximg {
    height: 38px;
    }
    .error-text {
    color: #fa8341;
    }
    .registerBG{
        background: url('./../../../static/images/bg.jpg') no-repeat;
        background-size:cover;
        width:100%;
        height:100%;
    }
  .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>