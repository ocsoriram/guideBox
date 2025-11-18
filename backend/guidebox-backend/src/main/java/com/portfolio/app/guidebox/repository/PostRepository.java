package com.portfolio.app.guidebox.repository;

import com.portfolio.app.guidebox.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JpaRepository.
 */

public interface PostRepository extends JpaRepository<Post, Long> {

}
