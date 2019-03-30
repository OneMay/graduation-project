<template>
  <div class="registerBG">
    <Modal
      v-model="modal"
      width="600"
      class-name="vertical-center-modal"
      :closable="false"
      :mask-closable="false"
    >
      <p slot="header" style="color:#f60;text-align:center"></p>
      <Row :gutter="32">
        <Col span="24" class="demo-tabs-style1">
          <Tabs>
            <TabPane label="登录">
              <Form
                ref="Login"
                :model="Login"
                class="signin"
                style="margin-top:30px"
              >
                <FormItem prop="mobile">
                  <Input
                    type="text"
                    v-model="Login.mobile"
                    placeholder="输入11位手机号"
                    :autofocus="true"
                    @on-keyup.enter="loginSubmit"
                  >
                    <Icon type="ios-call" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input
                    type="password"
                    v-model="Login.password"
                    placeholder="输入6位以上的字母+数字密码"
                    :autofocus="false"
                    @on-keyup.enter="loginSubmit"
                  >
                    <Icon type="md-lock" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem style="text-align:center">
                  <Button
                    type="primary"
                    @click="loginSubmit"
                    style="width:30%;font-size:16px"
                    >登录</Button
                  >
                </FormItem>
              </Form>
            </TabPane>
            <TabPane label="注册">
              <Form
                ref="Register"
                :model="Register"
                class="signup"
                style="margin-top:30px"
              >
                <FormItem prop="mobile">
                  <Input
                    type="text"
                    v-model="Register.mobile"
                    placeholder="输入11位手机号"
                    style="text-align:center"
                    @on-keyup.enter="registerSubmit"
                  >
                    <Icon type="ios-call" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input
                    type="password"
                    v-model="Register.password"
                    placeholder="输入6位以上的字母+数字密码"
                    @on-keyup.enter="registerSubmit"
                  >
                    <Icon type="md-lock" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem style="text-align:center">
                  <Button
                    type="primary"
                    @click="registerSubmit"
                    style="width:30%;font-size:16px"
                    >注册</Button
                  >
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <div slot="footer" style="text-align:center">
        <p>
          @2019 魔镜数据
          <a href="//www.miitbeian.gov.cn" target="_blank" class="beian"
            >蜀ICP备17011354号</a
          >
        </p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Fetcher from "../../assets/fetcher";
import commen from '../../assets/commen';
export default {
  name: "RegiterLogin",
  data() {
    return {
      modal: true,
      Login: {
        mobile: "",
        password: ""
      },
      Register: {
        mobile: "",
        password: ""
      }
    };
  },

  methods: {
    async loginSubmit() {
      const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      const passwordReg = /(?![0-9]+$)(?![a-zA-Z]+$)[\da-zA-Z]{6,}/;
      if (
        mobileReg.test(this.Login.mobile) &&
        passwordReg.test(this.Login.password)
      ) {
        const params = {
          mobile: this.Login.mobile,
          password: this.Login.password
        };
        let data = await Fetcher.login(this, params);
        if (data.code === 200) {
          this.$Message.success("登录成功");
          this.$store.dispatch("setUser", this.Login.mobile);

          window.mirrorCommandQueue = {
            system: "mirror",
            user: this.Login.mobile
          };
          Fetcher.postEventViewData({
            action: "登录与注册",
            category: "登录"
          });
         
          
             this.$router.push("/team/iteam");
        } else {
          this.$Message.error(data.message);
        }
      } else {
        this.$Message.error("手机号或者密码输入有问题");
      }
    },
    async registerSubmit() {
      const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      const passwordReg = /(?![0-9]+$)(?![a-zA-Z]+$)[\da-zA-Z]{6,}/;
      if (
        mobileReg.test(this.Register.mobile) &&
        passwordReg.test(this.Register.password)
      ) {
        Fetcher.postEventViewData({
          action: "登录与注册",
          category: "注册"
        });
        const params = {
          mobile: this.Register.mobile,
          password: this.Register.password
        };
        let data = await Fetcher.register(this, params);
        if (data.code === 200) {
          this.$Message.success("注册成功");
          this.Login.mobile = this.Register.mobile;
          this.Login.password = this.Register.password;
          setTimeout(this.loginSubmit,1000,this);
        } else {
          this.$Message.error(data.message);
        }
      } else {
        this.$Message.error("手机号或者密码输入有问题");
      }
    }
  },
   mounted() {
    this.$nextTick(() => {
      let body = document.getElementsByTagName('body')[0];
      let html = document.getElementsByTagName('html')[0];
      body.style.minWidth = '100%'
      html.style.minWidth = '100%'
    });
  },
};
</script>

<style lang="less"  >

.beian {
  color: #504b4b;
  &:hover {
    color: #f90;
  }
}
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

.registerBG {
  background: url("./../../../static/images/bg.jpg") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
    margin:0 !important;
  }
}
</style>
