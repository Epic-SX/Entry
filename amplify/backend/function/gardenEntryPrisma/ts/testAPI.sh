devUrl=https://7rmwymlhuk.execute-api.ap-northeast-1.amazonaws.com/dev
testUrl=https://jbn8c5g3oa.execute-api.ap-northeast-1.amazonaws.com/test
apiUrl=$devUrl

# API Gatewayのテスト
curl -X GET $apiUrl/tests/getChild?id=29
# curl -X POST -H "Content-Type: application/json" -d '@tests/createStudent.json' $apiUrl/students/create
# curl -X POST -H "Content-Type: application/json" -d '@tests/createStudentHistory.json' $apiUrl/student_histories/create
