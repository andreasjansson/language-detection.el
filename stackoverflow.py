# -*- coding: utf-8 -*-

from collections import defaultdict
import re
import os
import sys
from xml.etree import ElementTree
from HTMLParser import HTMLParser
from BeautifulSoup import BeautifulSoup

import decisiontree

tags_regex = re.compile('<([^>]+)>')
def extract_single_language(raw_tags):
    tags = tags_regex.findall(raw_tags)
    languages = set([decisiontree.LANGUAGE_ALIASES[t]
                     for t in tags
                     if t in decisiontree.LANGUAGE_ALIASES])
    if len(languages) == 1:
        return list(languages)[0]
    return None

html = HTMLParser()
def extract_snippet(s):
    s = s.replace('<br>', '\n').replace('<code>', '').replace('</code>', '')
    s = html.unescape(s)
    if '\n' not in s:
        return None
    return s

def extract_snippets(body):
    soup = BeautifulSoup(body)
    snippets = [s.text for s in soup.findAll('pre')]
    snippets = [extract_snippet(s) for s in snippets]
    snippets = [s for s in snippets if s]
    return snippets

def main(folder):
    filename = os.path.join(folder, 'Posts.xml')
    for event, post in ElementTree.iterparse(filename):
        items = dict(post.items())

        if items['PostTypeId'] != '1':
            continue

        if 'Tags' not in items:
            continue

        tags = items['Tags']
        language = extract_single_language(tags)
        if language is None:
            continue

        post_id = items['Id']
        body = items['Body']
        snippets = extract_snippets(body)
        if not snippets:
            continue

        folder = 'data/stackoverflow/%s' % language
        if not os.path.exists(folder):
            os.mkdir(folder)
        for i, snippet in enumerate(snippets):
            filename = '%s/%s_%d' % (folder, post_id, i)
            try:
                with open(filename, 'w') as f:
                    f.write(snippet)
            except UnicodeEncodeError:
                print 'unicode encode error'
                os.unlink(filename)


if __name__ == '__main__':
    main(os.path.expanduser(sys.argv[1]))
