import github3
import os

session = github3.login(username=os.environ.get('GITHUB_USERNAME'), password=os.environ.get('GITHUB_PASSWORD'))
for repo in session.iter_repos():
    repo.delete()
