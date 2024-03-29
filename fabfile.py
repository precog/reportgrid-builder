#!/usr/bin/env python

from fabric.api import env,hide,hosts
from fabric.colors import red,green #,yellow,cyan
from fabric.context_managers import cd,settings #,lcd
from fabric.decorators import task
from fabric.operations import run,sudo #local,put
from fabric.utils import puts,abort #,warn
# from fabric.contrib.files import sed

# import os
import time
# from shutil import copyfile

# Configure user, private key, etc. for SFTP deployment
env.user = 'ubuntu'
env.hosts = ["devqclus02.reportgrid.com"] if not env.hosts else env.hosts
env.colors = True
env.release = time.strftime('%Y%m%d%H%M%S')
env.basepath = '/var/www/builder' if not 'basepath' in env else env.basepath
env.repopath = '%(basepath)s/builder' % env if not 'repopath' in env else env.repopath
env.repository = 'git@github.com:precog/reportgrid-builder.git' if not 'repository' in env else env.repository
env.sitepath = '%(repopath)s/src' % env if not 'sitepath' in env else env.sitepath
env.linkpath = '%(basepath)s/current' % env if not 'linkpath' in env else env.linkpath
env.branch = 'origin/master' if not 'branch' in env else env.branch

@task
@hosts('localhost')
def production():
    """
        Run the tasks that follow it on production
    """
    env.hosts = ["nebula.precog.com"]
    env.sitepath = '%(repopath)s/build' % env

@task
def deploy():
    """
        Deploy builder from github to server
    """
    with settings(hide('everything'), warn_only=True):
        if run("test -d %(repopath)s" % env).failed:
            abort(red("Could not find repository path %(repopath)s: run setup task first" % env))

    puts(green("Deploying..."))
    with cd(env.repopath):
        run("git fetch")
        run("git reset --hard %(branch)s" % env)
    puts(green("Removing symlinks"))
    run("find %(sitepath)s -type l -delete" % env)

@task
def rollback():
    """
        Rollback to previously deployed version
    """
    puts(green("Rolling back..."))
    with cd(env.repopath):
        with settings(hide('everything')):
            version=run("git log -1 '--pretty=format:%h%d %ar %an %s' HEAD@{1}")
        puts(green("Previous version:\n%s" % version))
        run("git reset --hard HEAD@{1}")
        run("git reflog delete HEAD@{0}")
        run("git reflog delete HEAD@{0}")
    puts(green("Removing symlinks"))
    run("find %(sitepath)s -type l -delete" % env)

@task
def setup():
    """
        Setup environment for deployment -- does not configure web server
    """
    puts(green("Setting up deploy environment"))

    # Handles different apache group on qclus-demo01
    if env.host_string == 'qclus-demo01.reportgrid.com':
        env.group = 'apache'
    else:
        env.group = 'www-data'

    sudo("mkdir -p %(basepath)s" % env)
    sudo("chown -R ubuntu:%(group)s %(basepath)s" % env)
    sudo("chmod 6755 %(basepath)s" % env)
    sudo("rm -fr %(repopath)s %(linkpath)s" % env)
    with settings(warn_only=True):
        if run("git clone %(repository)s %(repopath)s" % env).failed:
            abort(red("Could not clone repository: does the user have read permission on it?"))
    run("ln -s %(sitepath)s %(linkpath)s" % env)

