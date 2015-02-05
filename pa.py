import tornado.httpserver
import tornado.ioloop
import tornado.web
import os
import torndb
import time
from config import dbconfig
class BaseHandler(tornado.web.RequestHandler):
	@property
	def db(self):
		return self.application.db
	def get_current_user(self):
		username = self.get_secure_cookie("name")
		if not username: return None
		return username

class MainHandler(BaseHandler):
	def get(self):
		loginname = self.get_current_user() 
		self.render("index.html",username=loginname);

class LoginHandler(BaseHandler):
	def get(self):
		#self.render("login.html");
		return;
	def post(self):
		password = self.db.get("SELECT   password from pauser WHERE name = %s",self.get_argument("name"))
		if type(password) != type(None) and password['password'] == self.get_argument("password") :
			self.set_secure_cookie("name",self.get_argument("name"),expires=time.time()+120) 
			self.redirect("/")
		else:
			self.redirect("/")	

class LookInfoHandler(BaseHandler):
	@tornado.web.authenticated
	def get(self):
		name = tornado.escape.xhtml_escape(self.current_user)
		self.write( "Hello," + name )

class LogoutHandler(BaseHandler):
	@tornado.web.authenticated
	def get(self):
		self.clear_cookie("name")
		self.redirect("/")

class RegisterHandler(BaseHandler):
	#@tornado.web.authenticated
	def get(self):
		self.render("register.html")
	def post(self):
		name = self.get_argument("name")
		password = self.get_argument("password")
		email = self.get_argument("email")
		try:
			self.db.execute(
				"INSERT INTO pauser (name,password,email) VALUES (%s,%s,%s)",name,password,email)
		except Exception as e:
			return;
		self.redirect("/")
			
settings= dict(
	static_path=os.path.join(os.path.dirname(__file__),"static"),
	template_path=os.path.join(os.path.dirname(__file__),"template"),
	debug=True,
	xsrf_cookies=True,
	cookie_secret="61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
	login_url="/",
)

application = tornado.web.Application([(r"/",MainHandler),
(r"/login",LoginHandler),
(r"/lookinfo",LookInfoHandler),
(r"/logout",LogoutHandler),
(r"/register",RegisterHandler),
],**settings)

application.db = torndb.Connection(**dbconfig)
if __name__ == "__main__":
	application.listen(8882);
	tornado.ioloop.IOLoop.instance().start()

