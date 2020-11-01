# require 'jwt'

# class Auth 

#     def self.create_token(user_object, exp = 24.hours.from_now)
#         payload = { user: JSON.parse(user_object.to_json)}
#         payload[:exp] = exp.to_i 
#         token = JWT.encode(payload, 'myapp')# HS256 # ENV[AUTH_SECRET] ENV[AUTH_ALGORITHM]
#     end 

#     def self.decode_token(token)
#         JWT.decode(token, 'myapp') #, true, { algorithm: HS256} )
#     end

# end