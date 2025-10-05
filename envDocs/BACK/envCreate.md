## 環境構築手順

backend を独立した Maven プロジェクトにする

Eclipseのメニューから
「ファイル > インポート > Maven > 既存のMavenプロジェクト」 を選択。

guideBox/backend/ をルートディレクトリに指定する。

backend/pom.xml が認識されれば、backend 単体のプロジェクトになる。

👉 これで Eclipse の「backend [boot]」直下に余計な frontend/ や docker-compose.yml が混ざらなくなる。
