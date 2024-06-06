
import { Suspense } from 'react';
import Course from '../../components/course';
import CourseClient from '../../components/courseClient';

import InstructorCard from '../../components/instructorCard';
import Keenslider from '../../components/Keenslider';
import Slider from '../../components/Slider';
import Loading from '../../components/loading';
const Page = async ({searchParams}) => {
 

  const fetchI =async() =>{
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors`,{ next: { revalidate: 21600 } });
      const I = await response.json();
      const filteredIs = I.filter(i => {
        return (
          i.name.toLowerCase().includes(searchParams.q.toLowerCase())           );
      });
      return filteredIs
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Handle error here
    }
  }
 const I = await fetchI()
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses`,{ next: { revalidate: 21600 } });

        const coursesData = await response.json();
        const filteredCourses = coursesData.filter(course => {
          return (
            course.title.toLowerCase().includes(searchParams.q.toLowerCase())
          
          );
        });
        return filteredCourses;
      } catch (error) {
        console.error('Error searching courses:', error);
        // Handle error here
      }
    };
    const fetchFCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses`,{ next: { revalidate:21600  } });

       const fCourses = response.json()
       
        return fCourses;
      } catch (error) {
        console.error('Error searching courses:', error);
        // Handle error here
      }
    };
    const courses = await fetchCourses()
    const fCourses = await fetchFCourses()


 
  const categoriesKeywordsMap = {     
    skills: { title: 'المهارات المكتبية',      keywords: [
      'time management', 'إدارة الوقت', 'communication skills', 'مهارات الاتصال', 'microsoft office', 'مايكروسوفت أوفيس',
      'excel', 'إكسل', 'word', 'ورد', 'powerpoint', 'باوربوينت', 'outlook', 'أوتلوك', 'data entry', 'إدخال البيانات',
      'office administration', 'إدارة المكاتب', 'typing skills', 'مهارات الطباعة', 'spreadsheet management', 'إدارة جداول البيانات',
      'email etiquette', 'آداب البريد الإلكتروني', 'project management', 'إدارة المشاريع', 'file management', 'إدارة الملفات',
      'report writing', 'كتابة التقارير', 'presentation skills', 'مهارات العرض', 'organizational skills', 'مهارات التنظيم',
      'customer service', 'خدمة العملاء', 'teamwork', 'العمل الجماعي', 'problem solving', 'حل المشكلات',
      'business writing', 'الكتابة التجارية', 'note taking', 'أخذ الملاحظات', 'scheduling', 'الجدولة',
      'document preparation', 'تحضير الوثائق', 'office software proficiency', 'إتقان برامج المكتب',
      'virtual collaboration', 'التعاون الافتراضي', 'cloud computing', 'الحوسبة السحابية', 'online meeting tools', 'أدوات الاجتماعات عبر الإنترنت',
      'digital literacy', 'المعرفة الرقمية', 'administrative skills', 'المهارات الإدارية', 'bookkeeping', 'الدفترة',
      'office technology', 'تكنولوجيا المكتب', 'conflict resolution', 'حل النزاعات', 'reception skills', 'مهارات الاستقبال',
      'multitasking', 'القيام بمهام متعددة', 'work prioritization', 'ترتيب أولويات العمل', 'attention to detail', 'الاهتمام بالتفاصيل'
  ]},
    designing: { title: 'التصميم',   keywords: [  'design', 'تصميم',
    'designing', 'التصميم',
    'graphic design', 'تصميم جرافيكي',
    'web design', 'تصميم ويب',
    'interior design', 'تصميم داخلي',
    'fashion design', 'تصميم أزياء',
    'industrial design', 'تصميم صناعي',
    'ux design', 'تصميم تجربة المستخدم',
    'ui design', 'تصميم واجهة المستخدم',
    'product design', 'تصميم المنتجات',
    'game design', 'تصميم الألعاب',
    'multimedia design', 'تصميم متعدد الوسائط',
    'animation', 'الرسوم المتحركة',
    '3d modeling', 'نمذجة ثلاثية الأبعاد',
    'cad design', 'تصميم بمساعدة الكمبيوتر',
    'architectural design', 'تصميم معماري',
    'automotive design', 'تصميم السيارات',
    'jewelry design', 'تصميم المجوهرات',
    'typography', 'الطباعة',
    'color theory', 'نظرية الألوان',
    'digital art', 'الفن الرقمي',
    'photoshop', 'فوتوشوب',
    'illustrator', 'إليستريتور',
    'adobe suite', 'مجموعة أدوبي',
    'sketch', 'سكتش',
    'invision', 'إنفجن',
    'prototyping', 'النماذج الأولية',
    'user experience', 'تجربة المستخدم',
    'user interface', 'واجهة المستخدم',
    'design thinking', 'التفكير التصميمي',
    'design principles', 'مبادئ التصميم',
    'branding', 'العلامات التجارية',
    'logo design', 'تصميم الشعارات',
    'packaging design', 'تصميم العبوات',
    'design software', 'برمجيات التصميم',
    'design trends', 'اتجاهات التصميم',
    'motion graphics', 'الرسوم المتحركة',
    'visual communication', 'التواصل البصري',
    'layout design', 'تصميم التخطيط',
    'design critique', 'نقد التصميم',
    'design strategy', 'استراتيجية التصميم',
    'design research', 'بحوث التصميم',
    'environmental design', 'تصميم بيئي',
    'sustainable design', 'التصميم المستدام',
    'accessibility in design', 'الوصولية في التصميم',
    'design for inclusivity', 'التصميم للشمولية',
    'design workshops', 'ورش عمل التصميم',
    'design presentations', 'عروض التصميم',
    'creative thinking', 'التفكير الإبداعي',
    'concept development', 'تطوير المفاهيم',
    'storyboarding', 'إعداد السيناريوهات',
    'design portfolio', 'ملف التصاميم'
  ]},
  healthandsafety: { title: 'السلامة والصحة المهنية',   keywords: ['السلامة في العمل', 'الصحة المهنية', 'الأمان المهني', 'تقييم المخاطر', 'الوقاية من الحوادث', 'إدارة السلامة',
  'سلامة الموظفين', 'التدريب على السلامة', 'التشريعات الصحية والسلامة', 'معايير السلامة', 'الوقاية من الحرائق',
  'الإسعافات الأولية', 'الأمان الكيميائي', 'التعامل مع المواد الخطرة', 'السلامة البيولوجية', 'السلامة الإشعاعية',
  'التهوية الصناعية', 'الحماية من السقوط', 'الأمان الكهربائي', 'معدات الحماية الشخصية', 'تحليل الحوادث',
  'تقييم المخاطر المهنية', 'الصحة النفسية في العمل', 'سلامة البناء', 'سلامة الآلات', 'مكافحة التلوث',
  'إدارة النفايات الخطرة', 'التدقيق البيئي والسلامة', 'الرصد البيئي', 'أنظمة إدارة السلامة', 'سلامة الأغذية',
  'سلامة المختبرات', 'التحقيق في الحوادث', 'السلامة النووية', 'سلامة المرور', 'الوقاية من الضوضاء',
  'الوقاية من الاهتزازات', 'الصحة المهنية للعمال', 'السلامة المهنية والصحة', 'معايير osha', 'iso 45001',
  'نظام إدارة السلامة والصحة المهنية', 'تدريب السلامة المهنية', 'الرفاهية في العمل', 'الصحة والسلامة التنفيذية',
    'workplace safety', 'occupational health', 'safety management', 'risk assessment', 'accident prevention',
    'employee safety', 'safety training', 'health and safety regulations', 'safety standards', 'fire safety',
    'first aid', 'chemical safety', 'hazardous material handling', 'biological safety', 'radiation safety',
    'industrial ventilation', 'fall protection', 'electrical safety', 'personal protective equipment', 'accident analysis',
    'occupational risk evaluation', 'mental health at work', 'construction safety', 'machinery safety', 'pollution control',
    'hazardous waste management', 'environmental and safety audits', 'environmental monitoring', 'safety management systems',
    'food safety', 'laboratory safety', 'incident investigation', 'nuclear safety', 'traffic safety', 'noise prevention',
    'vibration prevention', 'worker health', 'occupational safety and health', 'osha standards', 'iso 45001',
    'occupational health and safety management system', 'occupational safety training', 'workplace wellbeing',"nebosch","nebosh","neboch",'iosh',"fire","fire fighting", 'executive health and safety'
] },
    programming: { title: 'البرمجة',  keywords: [  'code', 'js', 'software', 'لغة', 'java', 'python', 'c#', 'ruby', 'php', 'c++', 'swift', 'kotlin', 
    'html', 'css', 'javascript', 'typescript', 'node.js', 'react', 'angular', 'vue.js', 'django', 'flask', 
    'asp.net', 'spring boot', 'laravel', 'mysql', 'postgresql', 'mongodb', 'sqlite', 'oracle', 
    'api', 'rest', 'graphql', 'json', 'xml', 'web development', 'mobile development', 'game development', 
    'data science', 'machine learning', 'ai', 'artificial intelligence', 'deep learning', 'neural networks', 
    'cloud computing', 'aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'devops', 'ci/cd', 
    'github', 'git', 'version control', 'unit testing', 'integration testing', 'system testing', 'security', 
    'encryption', 'blockchain', 'bitcoin', 'ethereum', 'smart contracts', 'iot', 'internet of things', 
    'ui/ux', 'user interface', 'user experience', 'frontend', 'backend', 'full stack', 'serverless', 
    'الذكاء الاصطناعي', 'تطوير الويب', 'تطوير التطبيقات', 'علوم البيانات', 'التعلم الآلي', 'الأمن السيبراني',
    'تشفير البيانات', 'قواعد البيانات', 'الحوسبة السحابية', 'واجهة المستخدم', 'تجربة المستخدم'
  ] },
    languages: { title: 'اللغات', keywords: [  'english', 'arabic', 'french', 'spanish', 'german', 'chinese', 'mandarin', 'japanese', 'russian', 
    'italian', 'portuguese', 'korean', 'hindi', 'urdu', 'bengali', 'turkish', 'vietnamese', 'polish', 
    'dutch', 'greek', 'hebrew', 'swedish', 'norwegian', 'danish', 'finnish', 'czech', 'romanian', 'hungarian', 
    'thai', 'indonesian', 'malay', 'filipino', 'persian', 'language learning', 'language teaching', 'linguistics', 
    'grammar', 'vocabulary', 'pronunciation', 'fluency', 'speaking', 'listening', 'writing', 'reading', 
    'language proficiency', 'language exchange', 'language skills', 'second language acquisition', 
    'foreign language education', 'language certification', 'IELTS', 'TOEFL', 'DALF', 'DELE', 'HSK', 
    'JLPT', 'language barriers', 'multilingualism', 'bilingualism', 'language immersion', 'language apps', 
    'language tools', 'translation', 'interpreting', 'subtitling', 'language technology', 'language studies', 
    'language culture', 'language history', 'sociolinguistics', 'dialects', 'accents', 'linguistic diversity', 
    'language revitalization', 'language policy', 'language and identity', 'language and society', 
    'language development', 'language education policy', 'linguistic anthropology',    'الإنجليزية', 'العربية', 'الفرنسية', 'الإسبانية', 'الألمانية', 'الصينية', 'الماندرين', 'اليابانية', 'الروسية',
    'الإيطالية', 'البرتغالية', 'الكورية', 'الهندية', 'الأردية', 'البنغالية', 'التركية', 'الفيتنامية', 'البولندية',
    'الهولندية', 'اليونانية', 'العبرية', 'السويدية', 'النرويجية', 'الدنماركية', 'الفنلندية', 'التشيكية', 'الرومانية', 'المجرية',
    'التايلاندية', 'الإندونيسية', 'الماليزية', 'الفلبينية', 'الفارسية', 'تعلم اللغات', 'تدريس اللغات', 'علم اللغة',
    'قواعد اللغة', 'مفردات اللغة', 'نطق', 'طلاقة اللغة', 'التحدث باللغة', 'الاستماع', 'الكتابة', 'القراءة',
    'كفاءة اللغة', 'تبادل اللغة', 'مهارات اللغة', 'اكتساب اللغة الثانية', 'تعليم اللغة الأجنبية', 'شهادات اللغة', 'آيلتس', 'توفل', 'دالف', 'ديلي', 'إتش إس كيه',
    'جي إل بي تي', 'حواجز اللغة', 'التعددية اللغوية', 'الثنائية اللغوية', 'الغمر اللغوي', 'تطبيقات اللغة', 'أدوات اللغة', 'الترجمة', 'الترجمة الفورية', 'الترجمة التحريرية',
    'تكنولوجيا اللغة', 'دراسات اللغة', 'ثقافة اللغة', 'تاريخ اللغة', 'اللغويات الاجتماعية', 'اللهجات', 'اللكنات', 'التنوع اللغوي',
    'إحياء اللغة', 'سياسة اللغة', 'الهوية واللغة', 'المجتمع واللغة', 'تطوير اللغة', 'سياسة تعليم اللغة', 'الأنثروبولوجيا اللغوية',"لغه", 'gym'] },
  };


  return (
    <div id='searchpage' className=' flex flex-col min-h-96 backdrop-blur-xl gap-7'>

{I &&I.length > 0&& 
        <>
          <span className='p-3 pb-0'>
            نتائج البحث عن <span className='font-extrabold'>{searchParams.q}</span>
          </span>
          <span className='p-3 py-0 text-xs'> عدد النتائج <span className=' font-extrabold'>{I.length}</span> </span>
<Suspense fallback={<div className=' bg-white h-96 w-full rounded-xl flex justify-center items-center'></div>}>
<Keenslider>
              {I && I.map(i => (
                   <div key={i._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                   className="keen-slider__slide min-w-fit">
        <Suspense fallback={<div className=' h-96 w-72 rounded-xl justify-center items-center bg-white'><Loading/></div>} >   
        <InstructorCard
                key={i._id}
                href={`/instructor/${i._id}`}
                image={i.photo}
                name={i.name}
                des={i.description}
              /></Suspense> 
              </div>
            ))}
          </Keenslider></Suspense>
        </>
      }

      { courses && courses.length > 0 ? (
        <>
          <span className='p-3 pb-0'>
            نتائج البحث عن <span className='font-extrabold'>{searchParams.q}</span>
          </span>
          <span className='p-3 py-0 text-xs'> عدد النتائج <span className=' font-extrabold'>{courses.length}</span> </span>
<Suspense fallback={<div className=' bg-white h-96 w-full rounded-xl flex justify-center items-center'></div>}>

<Keenslider>            {courses && courses.map(course => (
                   <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                   className="keen-slider__slide min-w-fit">
                     <Suspense fallback={<div className='  h-96 w-72 rounded-xl justify-center items-center bg-white'><Loading/></div>} >   

              <CourseClient
                key={course._id}
                href={`/courses/${course._id}`}
                photo={course.photo}
                title={course.title}
                price={course.price}
                courseId={course._id}
                instructor={course.author.name}
                hasPurchased={course.hasPurchased}
              
              /></Suspense>
              </div>
            ))}
          </Keenslider></Suspense>
        </>
      ) : (
        <div className=' flex justify-center items-center'>
          <p > لا يوجد كورسات تتطابق مع {searchParams.q} </p>
        </div>
      )}

<div className='coursesrelatedtosomcategories flex flex-col gap-7'>
        {/* Filter courses by categories */}
        {Object.entries(categoriesKeywordsMap).map(([category, { title, keywords }]) => {
          if (keywords.some(keyword => searchParams.q.toLowerCase().includes(keyword))) {
            return (
              
              <div key={category} className='  rounded-2xl overflow-hidden flex flex-col gap-3'>
                
                <h2> هل تبحث عن كورسات في مجال <span className=' text-xs font-extrabold'>{title}</span> </h2>
                <Suspense fallback={<div className=' bg-white h-96 w-full rounded-xl flex justify-center items-center'></div>}>
              
                {fCourses&& fCourses.length>0 &&
<Keenslider>
                {fCourses&& fCourses
                  .filter(course => course.category === category)
                  .map(course => (
                    <div key={course._id} style={{ maxWidth: "fit-content", minWidth:"fit-content" }}
                    className="keen-slider__slide min-w-fit">
                                        <Suspense fallback={<div className=' h-96 w-72 rounded-xl justify-center items-center bg-white'><Loading/></div>} >   

                    <CourseClient
                      key={course._id}
                      href={`/courses/${course._id}`}
                      photo={course.photo}
                      title={course.title}
                      instructor={course.author.name}
                      hasPurchased={course.hasPurchased}
                      price={course.price}
                      courseId={course._id}
                    /></Suspense>
                    </div>
                  ))}
                  </Keenslider> }</Suspense>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Page;