from __main__ import app

from flask import jsonify, request

from query_db import insert_promotion, delete_promotion, get_promotions

@app.route('/api/promotions', methods=['GET'])
def api_get_all_promotions():
    return jsonify(get_promotions())

@app.route('/api/promotions/add',  methods = ['POST'])
def api_add_promotion():
    promotion = request.get_json()
    return jsonify(insert_promotion(promotion))

@app.route('/api/promotions/delete/<promotion_id>',  methods = ['DELETE'])
def api_delete_promotion(promotion_id):
    return jsonify(delete_promotion(promotion_id))