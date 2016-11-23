require 'rubygems'
require 'sourceclassifier'

s = SourceClassifier.new

test_dir = 'test/data/stackoverflow'

languages = [
  'css', 'c', 'java', 'javascript', 'perl', 'php', 'python', 'ruby'
]

total = 0
correct = 0.0

Dir.foreach("#{test_dir}") do |lang|
  next if not languages.include? lang
  Dir.foreach("#{test_dir}/#{lang}") do |filename|
    next if filename == "." or filename == ".." or filename == 'filenames'
    begin
      pred = s.identify(File.read("#{test_dir}/#{lang}/#{filename}")).downcase
      if pred == 'gcc' then pred = 'c' end
      if lang == pred then
        correct += 1.0
      end
      total += 1
      score = (100 * correct / total).round
      puts "#{lang} #{pred} #{score}"
    rescue
    end
  end
end
