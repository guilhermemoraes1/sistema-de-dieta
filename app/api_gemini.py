import requests
from flask import Blueprint, request, Response
import json
from config import Config

api_gemini = Blueprint("api_gemini", __name__)

def promptSemParametro():
    prompt_text = """
    Me dê sugestões de café da manhã, almoço e janta indicando a quantidade de calorias em cada refeição em formato de texto corrido, sem listas nem Markdown.
    """
    generated_text = test_gemini_api_simplificado(prompt_text)
    return generated_text

def promptComParametro(caloria):
    prompt_text = f"""
    Me dê 3 sugestões de dieta com café da manhã, almoço e jantar, utilizando alimentos específicos e informando a quantidade aproximada de calorias de cada refeição. Cada sugestão deve totalizar exatamente {caloria} calorias, somando as três refeições. Apresente as respostas seguindo o seguinte formato fixo:
    Sugestão 1:
    Café da manhã:
    Almoço:
    Jantar:
    Sugestão 2:
    Café da manhã:
    Almoço:
    Jantar:
    Sugestão 3:
    Café da manhã:
    Almoço:
    Jantar:
    Use texto corrido e direto, sem listas, sem Markdown, sem marcação de texto, sem negrito, sem introduções ou explicações adicionais.
    """
    generated_text = test_gemini_api_simplificado(prompt_text)
    return generated_text


# Define a função principal para interagir com a API Gemini
def test_gemini_api_simplificado(prompt_text):
    """
    Envia um prompt para a API Gemini e imprime a resposta de forma mais simples.
    """
    # URL da API para o modelo gemini-2.0-flash.
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={Config.API_KEY}"

    # O prompt que você quer enviar para o modelo

    # Dados para enviar na requisição (payload)
    # Simplificamos a estrutura do payload, enviando o prompt diretamente.
    # No entanto, a API Gemini geralmente espera uma estrutura de "contents" com "role" e "parts".
    # Vamos manter a estrutura original do payload para compatibilidade.
    chat_history = [{"role": "user", "parts": [{"text": prompt_text}]}]
    payload = {"contents": chat_history}

    try:
        # Faz a requisição POST para a API
        response = requests.post(api_url, json=payload)
        response.raise_for_status() # Verifica se houve erros HTTP
    
        # Converte a resposta para JSON
        result = response.json()

        # Extrai e imprime o texto gerado de forma mais direta
        # Assume que a estrutura da resposta será sempre a esperada.
        # Para um código mais robusto, a verificação anterior era melhor.
        generated_text = result["candidates"][0]["content"]["parts"][0]["text"]
        print("Resposta da API Gemini:")
        return generated_text

    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição HTTP: {e}")
    except (KeyError, IndexError) as e:
        print(f"Erro ao processar a resposta da API: {e}")
        print("Verifique a estrutura da resposta JSON.")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")


@api_gemini.post("/members")
def caloriaInsercaoResource():
    userJson = request.get_json()
    result = promptComParametro(userJson)
    return Response(json.dumps({"resultado": result}, ensure_ascii=False), mimetype='application/json')


@api_gemini.route("/members")
def members():
    result = promptSemParametro()
    return Response(json.dumps({"resultado": result}, ensure_ascii=False), mimetype='application/json')