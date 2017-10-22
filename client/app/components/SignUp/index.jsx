import React from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import {Link} from 'react-router-dom'
import {backendUrl} from '../../config/urlConfig';
import {message} from 'antd';
import {TOKEN} from '../../constants/localStorage';
import local from '../../utils/localStore';
// import axios from '../../axios/index'
import axios from '../../axios/index'

const FormItem = Form.Item

class SignUpForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const url = `${backendUrl}/users/`
        axios.post(url, JSON.stringify({ // 验证用户名密码
          username: values.username,
          email: values.email,
          password: values.password
        }), {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(response => {
          local.setItem(TOKEN, response.data.token)
        }).catch(error => {
          console.log(error.response)
          if (error.response.status === 400) {
            const data = error.response.data
            for (let key in data) {
              message.error(`${key}错误: ${data[key]}`)
            }
          }
        })
      }
    })
  }

  checkUsername = (rule, value, callback) => {
    if (value && !/^\w{5,18}$/.test(value)) {
      callback('用户名必须由5-18位数字、字母、下划线组成!')
    } else {
      // TODO 检测是否存在
      callback()
    }
  }
  checkEmail = (rule, value, callback) => {
    if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
      callback('邮箱格式不正确!')
    } else {
      callback()
    }
  }
  checkPassword = (rule, value, callback) => {
    if (value && !/^.{5,18}$/.test(value)) {
      callback('密码长度必须为5-18位')
    } else {
      callback()
    }
  }
  checkPassword2 = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!')
    } else {
      callback()
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }
    return (
      <Form
        id="sign-up-form"
        onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名"
          {...formItemLayout}
        >
          {getFieldDecorator('username', {
            validateTrigger: 'onBlur',
            rules: [{
              required: true, message: '请输入用户名!'
            }, {
              validator: this.checkUsername
            }]
          })(
            <Input placeholder="用户名"/>
          )}
        </FormItem>
        <FormItem
          label="邮箱"
          {...formItemLayout}
        >
          {getFieldDecorator('email', {
            validateTrigger: 'onBlur',
            rules: [{
              required: false
            }, {
              validator: this.checkEmail
            }]
          })(
            <Input placeholder="邮箱"/>
          )}
        </FormItem>
        <FormItem
          label="密码"
          {...formItemLayout}
        >
          {getFieldDecorator('password', {
            validateTrigger: 'onBlur',
            rules: [{
              required: true, message: '请输入密码!'
            }, {
              validator: this.checkPassword
            }]
          })(
            <Input type="password" placeholder="密码"/>
          )}
        </FormItem>
        <FormItem
          label="确认密码"
          {...formItemLayout}
        >
          {getFieldDecorator('password2', {
            validateTrigger: 'onBlur',
            rules: [{
              required: true, message: '请再次输入密码!'
            }, {
              validator: this.checkPassword2
            }]
          })(
            <Input type="password" placeholder="确认密码"/>
          )}
        </FormItem>
        <FormItem
          className="submit"
          {...tailFormItemLayout}
        >
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          Or 已有账号?<Link to="/user/sign-in">直接登录</Link>
        </FormItem>
      </Form>
    )
  }
}

const SignUp = Form.create()(SignUpForm);
export default SignUp