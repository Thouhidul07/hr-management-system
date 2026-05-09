import pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'src'
count = 0
for p in root.rglob('*'):
    if p.is_file() and p.suffix in ('.js', '.jsx', '.ts', '.tsx'):
        s = p.read_text(encoding='utf-8')
        s2 = s.replace('\\"', '"').replace("\\'", "'")
        if s2 != s:
            p.write_text(s2, encoding='utf-8')
            print('fixed escapes', p.relative_to(root.parent))
            count += 1
print('done, files fixed:', count)
