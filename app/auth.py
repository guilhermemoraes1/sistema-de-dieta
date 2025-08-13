from flask import Blueprint, request, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db 
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint("auth", __name__)

@auth.route("/is-authenticated", methods=["GET"])
def is_authenticated():
    if current_user.is_authenticated:
        return jsonify({"authenticated": True, "username": current_user.username}), 200
    else:
        return jsonify({"authenticated": False}), 200

@auth.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user:
        if check_password_hash(user.password, password):
            login_user(user, remember=True)
            return jsonify({
                "message": "Usuário logado com sucesso",
                "redirect_to": "/dieta"
            }), 200
        else:
            return jsonify({"message": "Senha incorreta"}), 401
    else:
        return jsonify({"message": "Email não encontrado"}), 401


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({
            "message": "Usuário fez o logout",
            "redirect_to": "/guestPage"  
        }), 200


@auth.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    confirmPassword = data['confirmPassword']

    user = User.query.filter_by(email=email).first()
    if user:
        print('Email already exists.', category='error')
    elif(len(email)) < 8:
        print("Email must be greater than 8")
    elif len(username) < 3:
        pass
    elif password != confirmPassword:
        pass
    elif len(password) < 8:
        pass
    else:
        new_user = User(email=email, username=username, password=generate_password_hash(
                password, method='pbkdf2:sha256'))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        return jsonify({
            "message": "Usuário criado e logado com sucesso",
            "redirect_to": "/dieta"  # ou qualquer rota do frontend
        }), 200


    return jsonify({"message": "Signup recebido com sucesso"}), 200
