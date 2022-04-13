# Belajar Jira dan git

- buat jira dan buat story yang featurenya berdasarkan project pinjam buku kemarin
- dan undang gua ke jiranya emailnya dinotestes12@gmail.com
- project pinjam buku
- tiap orang buat satu feature dan koding didalam express ini,
  misal aqil buat login saja, kodingan boleh dicopas yang kemaren atau bikin baru.
- tiap buat feature buat branch berdasarkan kode jira.
- disini by default ada branch master, develop, dan bugfix

# cara menggabungkan code di github dengan github workflow

- local :
  - pindah ke branch develop
  - lakukan fetch dan pull
  - buat branch dengan kode stories yang mau dikerjakan
  - jika sudah selesai , `git add` -> `git commit -m 'KODE meesage'` -> di push ke github
- Github:
  - pilih pull request
  - pull request ke develop
  - jika able to merge langsung merge saja

# BAGAIMANA KLO KONFLIK

- Local:
  - pindah branch develop dulu, update /syncro develop dengan cara `git fetch` dan `git pull origin develop`
  - pindah ke branch yang di kerjakan sebelumnya
  - gabungkan develop ke branch yang kalian kerjakan atau yang konflik itu
  - pasti ada konflik, solve konfliknya.
  - jangan dites dulu, dan kalo aman commit perubahannya.
  - setelah itu push branch yang dikerjakan.
  - dua pilihan :
    - pilihan pertama:
      - langsung ke github lagi dan klik merge, pasti sudah bisa merge.
    - pilihan kedua:
      - pindah kedevelop
      - merge branch yang dikerjakan ke develop
      - push develop ke github
