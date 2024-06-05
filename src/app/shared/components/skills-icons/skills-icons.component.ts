import { Component } from '@angular/core';

@Component({
  selector: 'shared-skills-icons',
  templateUrl: './skills-icons.component.html',
  styleUrl: './skills-icons.component.scss'
})
export class SkillsIconsComponent {

  public skills = [
    {
      title: 'HTML',
      alt: 'html',
      img: '../../../../assets/img/html.webp'
    },
    {
      title: 'CSS',
      alt: 'css',
      img: '../../../../assets/img/css.webp'
    },
    {
      title: 'SCSS',
      alt: 'scss',
      img: '../../../../assets/img/scss.webp'
    },
    {
      title: 'Tailwind CSS',
      alt: 'tailwind',
      img: '../../../../assets/img/tailwind.webp'
    },
    {
      title: 'Bootstrap',
      alt: 'boots',
      img: '../../../../assets/img/boots.webp'
    },
    {
      title: 'JavaScript',
      alt: 'js',
      img: '../../../../assets/img/js.webp'
    },
    {
      title: 'TypeScript',
      alt: 'ts',
      img: '../../../../assets/img/ts.webp'
    },
    {
      title: 'PHP',
      alt: 'php',
      img: '../../../../assets/img/php.webp'
    },
    {
      title: 'Query',
      alt: 'jquery',
      img: '../../../../assets/img/jquery.webp'
    },
    {
      title: 'NodeJs',
      alt: 'node',
      img: '../../../../assets/img/node.webp'
    },
    {
      title: 'NPM',
      alt: 'npm',
      img: '../../../../assets/img/npm.webp'
    },
    {
      title: 'MongoDB',
      alt: 'mongo',
      img: '../../../../assets/img/mongo.webp'
    },
    {
      title: 'MySQL',
      alt: 'mysql',
      img: '../../../../assets/img/mysql.webp'
    },
    {
      title: 'NestJs',
      alt: 'nest',
      img: '../../../../assets/img/nestsJs.webp'
    },
    {
      title: 'Angular',
      alt: 'angular',
      img: '../../../../assets/img/angular.webp'
    },
    {
      title: 'React',
      alt: 'react',
      img: '../../../../assets/img/react.webp'
    }
  ]

}
